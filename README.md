# Open Public Transport App

Criado com o intuito de melhorar o acesso a informação sobre os transportes públicos no país.

# Local Development

#### Instruções para Linux (outros sistemas operacionais podem ter pequenas mudanças).

## Backend

#### Vale ressaltar que será muito importante utilizar um ambiente virtual:

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

## Frontend

```sh
  cd client
  npm i
  npm start
```

- Acesse `http://localhost:3000/`
