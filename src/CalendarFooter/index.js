import React, { Component } from 'react'

export default class CalendarFooter extends Component {

  handlePick() {
    this.props.datePickerToggle()
    this.props.picked()
  }

  render() {
    return (
      <div className="calendarFooter">
        <button onClick={this.handlePick.bind(this)}>
          确定
        </button>
      </div>
    )
  }
}