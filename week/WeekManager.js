import React from 'react'

var week = 0
fetch("https://mysibsau.ru/CurrentWeek/")
    .then(response => response.json())
    .then(json => week = json.week)

export const ManageWeekContext = React.createContext({
    week: week,
  });

export const useWeek = () => React.useContext(ManageWeekContext);

export class WeekManager extends React.Component {

    state = {
      week: week
    };

    render () {
      return (
        <ManageWeekContext.Provider value={{
          week: this.state.week,
        }}>
          {this.props.children}
        </ManageWeekContext.Provider>
      )
    }
  }
  
  export default WeekManager;