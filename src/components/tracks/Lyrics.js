import React, { Component } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import axios from "axios"

export default class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        // console.log(res.data)
        this.setState({ lyrics: res.data.message.body.lyrics })
        return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`

        )
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track })
      })
      .catch(err => console.log(err))
  }
  render() {
    const { track, lyrics } = this.state;
    if (track === undefined || lyrics === undefined || track === Object.keys(track).length === 0 || lyrics === Object.keys(lyrics).length === 0) {
      return <Spinner></Spinner>
    } else {
      return (
        <React.Fragment>
          <div className="card">
            <div className="card-header bg-info h4">
              {track.track_name} <span className="text-light lead">{track.artist_name}</span>
            </div>
            <div className="card-body">
              <div className="card-text">{lyrics.lyrics_body}</div>
            </div>
          </div>
          <Link to="/" className="btn btn-dark btn-sm mt-4 ">Go Back</Link>
        </React.Fragment>
      )
    }
  }
}
