import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'

export default class Search extends Component {
  state = {
    trackTitle: ''
  }
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  findTrack = (dispatch, e) => {
    e.preventDefault()
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=&page=10&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACK',
          payload: res.data.message.body.track_list

        })
        this.setState({
          trackTitle: ''
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fas-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg"
                    placeholder="Enter Song title here ..."
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onchange} />
                </div>
                <button className="btn btn-info btn-lg btn-block mb-5">Get Lyrics</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
