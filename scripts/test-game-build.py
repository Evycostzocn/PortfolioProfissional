"""Verifica o bootstrap gerado e os recursos otimizados; não substitui teste no browser."""
import ast
import gzip
import io
from pathlib import Path
import struct
import tarfile
import unittest

WEB = Path(__file__).resolve().parents[1] / 'public/games/big-bang'


class GameBuildTests(unittest.TestCase):
    def test_bootstrap_sem_espera_oculta(self):
        html = (WEB / 'index.html').read_text()
        self.assertNotIn('browserfs.min.js', html)
        bootstrap = html.split('>#<!--', 1)[1].split('# --></script>', 1)[0]
        ast.parse(bootstrap, feature_version=(3, 12))
        self.assertNotIn('while not platform.window.MM.UME', bootstrap)
        for stage in ('package', 'assets', 'starting'):
            self.assertIn(f'bigBangStatus("{stage}")', bootstrap)
        self.assertIn('bigBangStatus("error", str(error))', bootstrap)
        self.assertIn('asyncio.run(start_portfolio())', bootstrap)

    def test_extracao_aceita_resposta_bruta_e_descompactada_pelo_browser(self):
        html = (WEB / 'index.html').read_text()
        bootstrap = html.split('>#<!--', 1)[1].split('# --></script>', 1)[0]
        tree = ast.parse(bootstrap)
        call = next(node for node in ast.walk(tree) if isinstance(node, ast.Call)
                    and isinstance(node.func, ast.Attribute)
                    and isinstance(node.func.value, ast.Name)
                    and node.func.value.id == 'tarfile' and node.func.attr == 'open')
        mode = next(keyword.value.value for keyword in call.keywords if keyword.arg == 'mode')
        compressed = (WEB / 'big-bang.tar.gz').read_bytes()
        # O segundo caso reproduz o corpo que fetch entrega quando Vite define Content-Encoding.
        for payload in (compressed, gzip.decompress(compressed)):
            with tarfile.open(fileobj=io.BytesIO(payload), mode=mode) as archive:
                self.assertIn('assets/main.py', archive.getnames())

    def test_pacote_contem_recursos_otimizados(self):
        with tarfile.open(WEB / 'big-bang.tar.gz') as archive:
            files = archive.getnames()
            meat = next(name for name in files if name.endswith('/MeatUI2.png'))
            png = archive.extractfile(meat).read()
            self.assertEqual(struct.unpack('>II', png[16:24]), (50, 50))
            main = next(name for name in files if name.endswith('/main.py'))
            ast.parse(archive.extractfile(main).read(), feature_version=(3, 12))
        self.assertLess((WEB / 'big-bang.tar.gz').stat().st_size, 4 * 1024 * 1024)


if __name__ == '__main__':
    unittest.main()
