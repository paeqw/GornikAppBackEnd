import os;
import subprocess;
print("---------usuwanie plikow...---------")
for i in range(35):
    os.remove("oddzial"+str(i+1)+".html")
print("---------usunieto pliki pomyslnie przechodze do generacji nowych plikow---------")
for i in range(35):
    os.system("python htmlScraper.py " + str(i+1))
print("---------wygenerowano pliki pomyslnie mozna przejsc do dodawania do bazy danych---------")

