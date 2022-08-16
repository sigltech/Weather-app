import React from 'react'

export default function CheckWeather() {
  return (
    <div style={{'z-index': '100'}}>
        <form>
            <label htmlFor="location-input">Tell Us Where you Are...</label>
            <input type="text" name="location-input" id="location-input"/>
            <button type="submit" id='submit-btn'>Submit</button>
        </form>
    </div>
  )
}
