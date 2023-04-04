import React, { Component } from 'react'

export class NewsItem extends Component {
    // constructor(){
    //     super(); 
    // }
  render() {
    //destructing of props
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
        <div className="card">
            <div style={{
              display: 'flex',
              justifyContent : 'flex-end',
              position : 'absolute',
              right : '0'
            
            }}>
              <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
            <img src={imageUrl?imageUrl:"https://thumbs.dreamstime.com/b/shedding-light-news-4226971.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem