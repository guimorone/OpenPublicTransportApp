# Open Public Transport App

Criado com o intuito de melhorar o acesso a informação sobre os transportes públicos no país.

Atualmente, irá funcionar apenas para Recife. Porém, a ideia é expandir para todo o país.

### Depedências:

- Python v3.8.10
- pip v20.0.2
- React v18.1.0
- npm v8.7.0

## Local Development

Instruções para Linux (outros sistemas operacionais podem ter pequenas mudanças).

### Backend

Vale ressaltar que será muito importante utilizar um ambiente virtual:

```sh
  pip install virtualenv
```

```sh
  cd server
  virtualenv -p python3 venv && source venv/bin/activate
  pip install -r requirements.txt
  python3 run.py
```

- Acesse `http://localhost:5500/`
- Além disso, você deve criar um arquivo `.env` e colocar seu access token do LocationIQ lá no formato `LOCATION_IQ_ACCESS_TOKEN=<TOKEN>`

### Frontend

```sh
  cd client
  npm i
  npm start
```

- Acesse `http://localhost:3000/`

#### Obs: Se der problema em algum pacote, pode adicionar a tag `--force` sem medo ao `npm i`
