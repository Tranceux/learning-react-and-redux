import React from 'react'

class App extends React.Component {
  constructor() {
    super();
    this.state = {data: [
      {id: 1, name: 'Toto'},
      {id: 2, name: 'Tutu'},
      {id: 3, name: 'Titi'},
      {id: 4, name: 'Tata'},
      {id: 5, name: 'Zob'},
      {id: 6, name: 'Coucou'},
      {id: 7, name: 'Salut'},
    ]}
  }
  render() {
    let rows = this.state.data.map(person =>  {
      return <PersonRow key={person.id} data={person} />
    })
    return  <table>
              <tbody>{rows}</tbody>
            </table>
  }
}

const PersonRow = (props) => {
  return <tr>
          <td>{props.data.id}</td>
          <td>{props.data.name}</td>
        </tr>
}

export default App
