"""Empacota apenas os arquivos de execução; não inclui .git, testes ou caches."""
from pathlib import Path
import shutil
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'Trabalho_Pygame'
STAGE = ROOT / '.game-build' / 'big-bang'
OUTPUT = ROOT / 'public' / 'games' / 'big-bang'
STAGE.mkdir(parents=True, exist_ok=True)
for directory in ('src', 'assets', 'data'):
    target = STAGE / directory
    if target.exists():
        shutil.rmtree(target)  # Somente cópias temporárias criadas por este script.
    shutil.copytree(SOURCE / directory, target, ignore=shutil.ignore_patterns('__pycache__', '*.md'))
for filename in ('main.py', 'LICENSE'):
    shutil.copy2(SOURCE / filename, STAGE / filename)

# SDL no navegador usa OGG; os WAV originais continuam disponíveis no desktop.
for wav in (STAGE / 'assets' / 'sons').glob('*.wav'):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(wav), str(wav.with_suffix('.ogg'))], check=True)
    wav.unlink()
# As imagens originais chegam a 4524×4524, mas a carne aparece em 50×50.
# Reduzimos só a cópia web aos tamanhos usados na tela, evitando decodificar dezenas de MB.
for png in (STAGE / 'assets' / 'imagens').rglob('*.png'):
    if png.name == 'MeatUI2.png':
        size = '50:50'
    elif 'dino_sprites' in png.parts:
        size = '100:80'
    elif 'buttons' in png.parts:
        size = '96:72' if png.name in ('plus_button.png', 'minus_button.png') else '324:108'
    elif png.name == 'background_menu.png':
        size = '1440:720'
    elif png.name == 'logo_bigbang.png':
        size = '404:202'
    else:
        continue
    optimized = png.with_name(png.stem + '-web.png')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(png),
                    '-vf', f'scale={size}', '-compression_level', '9', str(optimized)], check=True)
    optimized.replace(png)

subprocess.run([sys.executable, '-m', 'pygbag', '--build', '--no_opt', '--ume_block', '0',
                '--width', '1080', '--height', '720', '--app_name', 'big-bang', '--package', 'portfolio.bigbang', str(STAGE)], check=True)
web = STAGE / 'build' / 'web'
index = web / 'index.html'
if not index.exists():
    raise RuntimeError('pygbag não gerou index.html. Confira a conexão com o CDN.')
html = index.read_text()
# O template 0.9.3 ainda referencia BrowserFS em uma URL 404. A extração atual
# usa tarfile/zipfile no Python, e não precisa desse script legado.
html = re.sub(r'<script src="[^"]*/browserfs\.min\.js"></script>', '', html)
# Vite envia .gz com Content-Encoding: gzip: fetch entrega o TAR já descompactado.
# A hospedagem também pode entregar gzip bruto; r:* reconhece ambos sem dupla descompressão.
html = html.replace('tarfile.open(fileobj=archive, mode="r:gz")',
                    'tarfile.open(fileobj=archive, mode="r:*")')
# O template pode esperar uma interação de mídia mesmo após terminar os downloads.
# O menu inicia sem bloquear; o navegador libera áudio após o clique normal nos menus.
start = html.index('    # test/wait user media interaction')
end = html.index('    # start async top level machinery', start)
html = html[:start] + html[end:]
html = html.replace('    import embed\n', '    import embed\n    platform.window.bigBangStatus("package")\n', 1)
html = html.replace('    # wait preloading complete', '    platform.window.bigBangStatus("assets")\n    # wait preloading complete', 1)
html = html.replace('    await shell.source(main, callback=ui_callback)', '    platform.window.bigBangStatus("starting")\n    await shell.source(main, callback=ui_callback)', 1)
# Erros do bootstrap acontecem antes de main.py e precisam chegar ao modal também.
html = html.replace('asyncio.run( custom_site() )', '''async def start_portfolio():
    try:
        await custom_site()
    except Exception as error:
        platform.window.bigBangStatus("error", str(error))
        raise

asyncio.run(start_portfolio())''')
# O template padrão fixa 16:9; o framebuffer deste jogo usa 3:2.
html = html.replace('fb_ar   :  1.77', 'fb_ar   :  1.5')
# A ponte antecede o runtime para também detectar erros durante sua inicialização.
bridge = '<script src="./portfolio-bridge.js"></script><link rel="stylesheet" href="./portfolio-game.css">'
html = html.replace('<head>', '<head>' + bridge, 1)
if bridge not in html:
    raise RuntimeError('Template pygbag mudou: não foi encontrado <head>.')
OUTPUT.mkdir(parents=True, exist_ok=True)
for asset in web.iterdir():
    if asset.is_file():
        shutil.copy2(asset, OUTPUT / asset.name)
(OUTPUT / 'index.html').write_text(html)
for filename in ('portfolio-bridge.js', 'portfolio-game.css'):
    shutil.copy2(ROOT / 'scripts' / filename, OUTPUT / filename)
print(f'Jogo web atualizado em {OUTPUT}')
