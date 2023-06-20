import json

file = open("dataset-reparacoes.json", "r")

data = json.load(file)

data = data["reparacoes"]

for i in range(len(data)):
    data[i]["id"] = i

file.close()

json.dump(data, open("dataset-reparacoes-id.json", "w"))