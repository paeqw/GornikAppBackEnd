from requests.auth import HTTPBasicAuth
import requests
from bs4 import BeautifulSoup
import sys

def costam(jakiOddzial):
    requests.encoding = 'utf-8'
    user = '3bt'
    password = "TPx%2#"
    url = "http://www.gornik.tbg.net.pl/info/plan_lekcji/230130/plany/o"+str(jakiOddzial)+".html"
    response= requests.get(url , auth=HTTPBasicAuth(user, password))
    soup = BeautifulSoup(response.content.decode('utf-8'), 'html.parser')
    soup = soup.find("table",{"class":"tabela"})

    # Save the HTML content to a file with utf-8 encoding
    with open('oddzial'+jakiOddzial+'.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
if __name__ == "__main__":
    jakiOddzial = sys.argv[1]
    costam(jakiOddzial)

