#!/usr/bin/env python3
"""Cucina Serena — Jogo Americano Primo Bambini (A4 landscape, vector PDF imprimivel).

Aplica a skill canvas-design: filosofia de design -> expressao em canvas.
Requer: reportlab, pillow. Fontes em skills/canvas-design/canvas-fonts/.
Uso: python3 build_placemat.py  ->  JogoAmericano-PrimoBambini.pdf
"""
import os, random, textwrap
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONT_DIR = "../../../skills/canvas-design/canvas-fonts"  # ajuste conforme seu setup
OUT = "JogoAmericano-PrimoBambini.pdf"

# ---- paleta Cucina Serena ----
CREAM = (0.976, 0.961, 0.918)   # #F9F5EA papel de pao
SAGE  = (0.412, 0.502, 0.365)   # #69805D verde-salvia
TERRA = (0.776, 0.420, 0.290)   # #C66B4A terracota
GOLD  = (0.804, 0.643, 0.345)   # #CDA458 azeite
INK   = (0.235, 0.204, 0.169)   # #3C342B tinta sepia

def reg(name, path):
    pdfmetrics.registerFont(TTFont(name, os.path.join(FONT_DIR, path)))
reg("Italiana", "Italiana-Regular.ttf")
reg("Young", "YoungSerif-Regular.ttf")
reg("Crimson", "CrimsonPro-Regular.ttf")
reg("CrimsonB", "CrimsonPro-Bold.ttf")
reg("CrimsonI", "CrimsonPro-Italic.ttf")
reg("Mono", "DMMono-Regular.ttf")

W, H = A4
W, H = H, W  # landscape
c = canvas.Canvas(OUT, pagesize=(W, H))
def setf(col): c.setFillColorRGB(*col)
def sets(col): c.setStrokeColorRGB(*col)

setf(CREAM); c.rect(0, 0, W, H, fill=1, stroke=0)
M = 14*mm
sets(INK); c.setLineWidth(1.2); c.rect(M*0.6, M*0.6, W-1.2*M, H-1.2*M, fill=0, stroke=1)
sets(GOLD); c.setLineWidth(0.5); c.rect(M*0.6+3, M*0.6+3, W-1.2*M-6, H-1.2*M-6, fill=0, stroke=1)

def leaf(x, y, s, col, ang=0):
    c.saveState(); c.translate(x, y); c.rotate(ang); setf(col)
    p = c.beginPath(); p.moveTo(0,0)
    p.curveTo(s*0.5, s*0.4, s*0.5, s*1.0, 0, s*1.4)
    p.curveTo(-s*0.5, s*1.0, -s*0.5, s*0.4, 0, 0)
    c.drawPath(p, fill=1, stroke=0)
    sets((1,1,1)); c.setLineWidth(0.5); c.line(0, s*0.15, 0, s*1.2)
    c.restoreState()

cx = W/2
setf(INK); c.setFont("Italiana", 40)
c.drawCentredString(cx, H-M-12*mm, "Primo Bambini")
leaf(cx-52*mm, H-M-21*mm, 5, SAGE, 20); leaf(cx+50*mm, H-M-21*mm, 5, SAGE, -20)
setf(SAGE); c.setFont("CrimsonI", 15)
c.drawCentredString(cx, H-M-20*mm, "Enquanto a sua comida chega, vamos brincar?")
sets(GOLD); c.setLineWidth(0.8); c.line(cx-30*mm, H-M-24*mm, cx+30*mm, H-M-24*mm)

top = H-M-30*mm
colL = M*0.6 + 8*mm
colW = (W - 1.2*M - 16*mm - 2*8*mm)/3
gap = 8*mm

def panel(x, y, w, h, title, titlecol=SAGE):
    sets(INK); c.setLineWidth(0.7); c.roundRect(x, y-h, w, h, 4*mm, fill=0, stroke=1)
    setf(titlecol); c.roundRect(x, y-9*mm, w, 9*mm, 4*mm, fill=1, stroke=0)
    setf(CREAM); c.setFont("Young", 12.5)
    c.drawCentredString(x+w/2, y-6.4*mm, title)

panelH = top - (M*0.6 + 10*mm)

# COLUNA 1: Caca-palavras (palavras realmente embutidas)
x1 = colL
panel(x1, top, colW, panelH, "Caca-Palavras")
words = ["PENNE","PESTO","AZEITE","TOMATE","QUEIJO","MASSA"]
N = 9
grid = [["" for _ in range(N)] for _ in range(N)]
for w,r,co,dr,dc in [("PENNE",0,0,0,1),("PESTO",2,1,1,0),("AZEITE",4,0,0,1),
                     ("TOMATE",1,3,1,0),("QUEIJO",6,2,0,1),("MASSA",3,7,1,0)]:
    for i,ch in enumerate(w): grid[r+dr*i][co+dc*i]=ch
random.seed(7); AL="ABCDEFGHILMNOPRSTUV"
for r in range(N):
    for co in range(N):
        if grid[r][co]=="": grid[r][co]=random.choice(AL)
gx = x1+5*mm; gy = top-15*mm; cell = (colW-10*mm)/N
c.setFont("Mono", 8.5)
for r in range(N):
    for co in range(N):
        setf(INK); c.drawCentredString(gx+cell*co+cell/2, gy-cell*r-cell*0.7, grid[r][co])
c.setFont("CrimsonB", 9); setf(TERRA); ly = gy-cell*N-4*mm
c.drawString(x1+5*mm, ly, "Encontre estas palavras:")
c.setFont("Crimson", 9.5); setf(INK)
for i,w in enumerate(words[:3]):
    leaf(x1+5*mm, ly-7*mm-i*5.2*mm-0.5*mm, 2.0, SAGE, 15); c.drawString(x1+9*mm, ly-7*mm-i*5.2*mm, w.capitalize())
for i,w in enumerate(words[3:]):
    leaf(x1+colW/2+2*mm, ly-7*mm-i*5.2*mm-0.5*mm, 2.0, SAGE, 15); c.drawString(x1+colW/2+6*mm, ly-7*mm-i*5.2*mm, w.capitalize())

# COLUNA 2: nome + area de desenho
x2 = colL+colW+gap
panel(x2, top, colW, panelH, "Este Lugar e Meu", TERRA)
c.setFont("Crimson", 10); setf(INK); c.drawString(x2+5*mm, top-16*mm, "Meu nome:")
sets(GOLD); c.setLineWidth(0.7); c.line(x2+5*mm, top-22*mm, x2+colW-5*mm, top-22*mm)
c.setFont("Crimson", 10); c.drawString(x2+5*mm, top-28*mm, "Idade:")
c.line(x2+22*mm, top-29*mm, x2+colW-5*mm, top-29*mm)
c.setFont("CrimsonI", 9.5); setf(SAGE); c.drawString(x2+5*mm, top-35*mm, "Desenhe o seu prato favorito:")
sets(INK); c.setLineWidth(0.6); c.setDash(2,2)
draw_top = top-38*mm; draw_h = draw_top-(M*0.6+12*mm)
c.roundRect(x2+5*mm, M*0.6+12*mm, colW-10*mm, draw_h, 3*mm, fill=0, stroke=1); c.setDash()
ccx=x2+colW/2; ccy=M*0.6+12*mm+draw_h/2
setf((0.93,0.91,0.86)); c.circle(ccx, ccy, 17*mm, fill=1, stroke=0)
setf(CREAM); c.circle(ccx, ccy, 12*mm, fill=1, stroke=0)
sets((0.88,0.85,0.79)); c.setLineWidth(1.4)
c.line(ccx-26*mm, ccy+6*mm, ccx-26*mm, ccy-6*mm); c.line(ccx+26*mm, ccy+6*mm, ccx+26*mm, ccy-6*mm)

# COLUNA 3: quiz + curiosidade
x3 = colL+2*(colW+gap)
panel(x3, top, colW, panelH, "Quiz do Chef", GOLD)
quiz = [("De que pais vem a massa?", "( ) Brasil   ( ) Italia"),
        ("Pesto leva qual erva?", "( ) Hortela   ( ) Manjericao"),
        ("Azeite vem de qual fruta?", "( ) Uva   ( ) Azeitona"),
        ("'Obrigado' em italiano e:", "( ) Merci   ( ) Grazie")]
qy = top-16*mm
for i,(q,a) in enumerate(quiz):
    c.setFont("CrimsonB", 9.5); setf(INK); c.drawString(x3+5*mm, qy, f"{i+1}. {q}")
    c.setFont("Crimson", 9); setf(SAGE); c.drawString(x3+8*mm, qy-4.6*mm, a); qy -= 12*mm
cy0 = M*0.6+12*mm
setf((0.95,0.93,0.87)); c.roundRect(x3+5*mm, cy0, colW-10*mm, 26*mm, 3*mm, fill=1, stroke=0)
leaf(x3+9*mm, cy0+18*mm, 3.4, SAGE, 15)
c.setFont("Young", 9.5); setf(TERRA); c.drawString(x3+14*mm, cy0+20*mm, "Sabia que...")
c.setFont("CrimsonI", 8.7); setf(INK)
for j,line in enumerate(textwrap.wrap("Na Italia existem mais de 300 formatos diferentes de massa, cada um com seu nome e historia!", 34)):
    c.drawString(x3+8*mm, cy0+14*mm-j*4.4*mm, line)

setf(SAGE); c.setFont("Italiana", 11)
c.drawCentredString(cx, M*0.6+4.5*mm, "Primo Cucina  ·  Campinas")
c.showPage(); c.save()
print("OK ->", OUT, round(os.path.getsize(OUT)/1024,1), "KB")
