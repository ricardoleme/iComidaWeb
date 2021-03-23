const BASE_API = 'http://localhost:4000'
const token = localStorage.getItem('token')

const funcs = {
    checkToken:async() => {
        const req = await fetch(`${BASE_API}/usuario/eu`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'access-token': `${token}`
            }
        })
        const json = await req.json()
        return json
    },
    signIn:async(email, senha) => {
        await fetch(`${BASE_API}/usuarios/login`,{
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email, senha:senha})
        })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(function (error) {
        console.error('Houve um problema ao efetuar a requisição: ' + error.message);
      });
        
        return 
        
    },
    signUp:async(nome, email, senha, tipo='cliente') => {
        const req = await fetch(`${BASE_API}/usuario/novo`,{
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email, senha, tipo})
        })
        const json = await req.json()
        return json
        
    },
    logout:() => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        return null
        
    },
    getPasseadores:async() => {
        const req = await fetch(`${BASE_API}/passeador`,{
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'access-token': `${token}`
            }
        })
        const json = await req.json()
        return json
    },
    getPasseador:async(id) => {
        let token = localStorage.getItem('token')
        const req = await fetch(`${BASE_API}/passeador/${id}`,{
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const json = await req.json()
        console.log(json)
        return json
    }
}

export default funcs