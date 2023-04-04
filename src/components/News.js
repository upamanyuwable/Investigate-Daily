import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    
    static defaultProps = {
        country : 'us',
        pageSize : 10,
        category : 'general'
    }
    constructor(){
        super(); 
        this.state={
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0,
            progress : 0
        }
    }

    async updateNews(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            loading : false
        })
        console.log("Component DId mount ")
        this.props.setProgress(100);
    }
    
    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles : parsedData.articles,
        //     totalResults : parsedData.totalResults,
        //     loading : false
        // })
        // console.log("Component DId mount ")
        this.updateNews();
    }
    
    handlePrevClick = async() =>{
        // let url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles : parsedData.articles,
        //     page : this.state.page-1,
        //     loading : false
        // })
        // console.log("clicked on Prev");
        this.setState({page:this.state.page-1})
        this.updateNews()
    }
    
    handleNextClick = async() =>{
        // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            
        // }
        // else{
        //     let url=`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey} &page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         articles : parsedData.articles,
        //         page : this.state.page+1,
        //         loading : false
        //     })
        // }
        // console.log("Clicked on Next");
        this.setState({page:this.state.page+1})
        this.updateNews()
    }

    // fetchMoreData = async() =>{
    //     this.setState({page : this.state.page+1})
    //     const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         articles : this.state.articles.concat(parsedData.articles),
    //         totalResults : parsedData.totalResults
    //     })
    // }
    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            page : this.state.page + 1
        })
    };
    
    
    render() {
        return (
            <>
                <h1 className='text-center' style={{marginTop:'80px'}}>investigateDaily - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                <div className="container">

                <div className="row" >
                    {this.state.articles.map((element)=>{
                            return(
                                <div className="col-md-4 my-4" key={element.url}>
                                <NewsItem 
                                    title={element.title} 
                                    description={element.description}
                                    imageUrl={element.urlToImage }
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                                </div>
                            )
                    })}
                </div>
                </div>
                </InfiniteScroll> 
            </>
        )
    }
}

export default News