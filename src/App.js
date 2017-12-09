import React, { Component } from 'react'
import './App.css'
import CalendarHeader from './CalendarHeader'
import CalendarMain from './CalendarMain'
import CalendarFooter from './CalendarFooter'

const displayDaysPerMonth = (year) => {
  // 定义每个月的天数存入数组
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // 如果是闰年二月改为29天
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29
  }

  // 以下为获取一年中每个月在日历选择器上显示的数据
  // 从上个月开始，然后是当前月，最后是下个月的头几天

  // 定义一个数组，保存上一个月的天数
  var daysInPreMonth = [].concat(daysInMonth)
  daysInPreMonth.unshift(daysInPreMonth.pop())

  // 获取每个月显示数据中需要补足上个月的天数
  let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
    let day = new Date(year, index, 1).getDay()
    if (day === 0) {
      return 0
    } else {
      return day - 1
    }
  })

  // 以数组形式返回一年中每个月的显示数据，每个数组为6行*7天
  return new Array(12)
    .fill([])
    .map((month, monthIndex) => {
      let addDays = addDaysFromPreMonth[monthIndex],
        daysCount = daysInMonth[monthIndex],
        daysCountPrevious = daysInPreMonth[monthIndex],
        monthData = []
      //补足上一个月
      for (; addDays > 0; addDays--) {
        monthData.unshift(daysCountPrevious--)
      }
      //添入当前月
      for (let i = 0; i < daysCount;) {
        monthData.push(++i)
      }
      //补足下一个月
      for (let i = 42 - monthData.length, j = 0; j < i;) {
        monthData.push(++j)
      }
      return monthData
    })
}

class App extends Component {
  constructor (props) {
    super(props)
    let now = new Date()
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      picked: false,
      display: true
    }
  }

//切换到下一个月
  nextMonth () {
    if (this.state.month === 11) {
      this.setState({
        year: ++this.state.year,
        month: 0
      })
    } else {
      this.setState({
        month: ++this.state.month
      })
    }
  }

  //切换到上一个月
  prevMonth () {
    if (this.state.month === 0) {
      this.setState({
        year: --this.state.year,
        month: 11
      })
    } else {
      this.setState({
        month: --this.state.month
      })
    }
  }

  //选择日期
  datePick (day) {
    this.setState({day})
  }

  //切换日期选择器是否显示
  datePickerToggle () {
    this.setState({
      display: !this.state.display
    })
  }

  //标记日期已经选择
  picked () {
    this.state.picked = true
  }

  render () {
    let props = {
      viewData: displayDaysPerMonth(this.state.year),
      datePicked: `${this.state.year} 年
                   ${this.state.month + 1} 月
                   ${this.state.day} 日`
    }
    return (
      <div className="output">
        <div className="star1"></div>
        <div className="star2"></div>
        <div className="star3"></div>
        <p className="datePicked" onClick={this.datePickerToggle.bind(this)}>
          {props.datePicked}
        </p>
        <div className="main" style={{display: this.state.display ? 'block' : 'none'}}>
          <CalendarHeader prevMonth={this.prevMonth.bind(this)}
                          nextMonth={this.nextMonth.bind(this)}
                          year={this.state.year}
                          month={this.state.month}
                          day={this.state.day} />
          <CalendarMain {...props}
                        prevMonth={this.prevMonth.bind(this)}
                        nextMonth={this.nextMonth.bind(this)}
                        datePick={this.datePick.bind(this)}
                        year={this.state.year}
                        month={this.state.month}
                        day={this.state.day} />
          <CalendarFooter
            picked={this.picked.bind(this)}
            datePickerToggle={this.datePickerToggle.bind(this)} />
        </div>
      </div>
    )
  }
}

export default App
