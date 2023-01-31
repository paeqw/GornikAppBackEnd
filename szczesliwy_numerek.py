import datetime
from urllib.request import urlopen
from bs4 import BeautifulSoup

def line_prepender(filename, line):
    with open(filename, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(line.rstrip('\r\n') + '\n' + content)

url = "http://www.gornik.tbg.net.pl/Numerek/numerek.php"
try:
    page = urlopen(url)
except:
    print("tu bugi wyszly")
soup = BeautifulSoup(page, 'html.parser')
content = soup.find('big')
date = str(datetime.datetime.now())
date = date[:-16]
article = ''
for i in content.findAll('b'):
    article = article  +  i.text
article = article + ", " +  date

with open('numerki.txt') as f:
    if article not in f.read():
        line_prepender("numerki.txt", article)

