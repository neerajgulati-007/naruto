import React from 'react';
import { connect } from 'react-redux';

import { fetchMoreAnimes, searchAnimes } from '../ducks/animes';

import AnimeCard from '../components/AnimeCard';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const getQueryParams = (search) => {
  const queryParamsIt = new URLSearchParams(search);
  const queryParams = {};
  for (const [key, value] of queryParamsIt.entries()) {
    queryParams[key] = value;
  }
  return queryParams;
}


var getQueryString = (queryParams) => Object.keys(queryParams).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
}).join('&');

class Home extends React.Component {
  constructor(props) {
    super(props);
    const queryParams = getQueryParams(this.props.location.search);
    this.state = {
      queryParams: {
        query: queryParams.query || 'naruto',
        page: queryParams.page || 1,
        limit: queryParams.limit || 16
      }
    }
  }

  componentDidMount() {
    this.props.searchAnimes({ ...this.state.queryParams });
  }

  navigateToParams = (queryParams) => {
    this.setState({ queryParams });
    const { location: { pathname } } = this.props;
    const search = getQueryString(queryParams);
    this.props.history.push(`${pathname}?${search}`);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      
      const prevParams = getQueryParams(prevProps.location.search);
      const params = getQueryParams(this.props.location.search);
      
      if(prevParams.query !== params.query) {
        this.props.searchAnimes({...this.state.queryParams});
      } 

      else if(prevParams.page!== params.page) {
        this.props.fetchMoreAnimes({ ...this.state.queryParams });
      }
      
      
    }
  }

  render() {
    console.log("props are===>", this.props);
    const { animes, lastPage, loading, url } = this.props;
    return (
      <div className="page-container">
        <div className="mb2">
          <Search
            {...this.state}
            navigateToParams={this.navigateToParams}
          />
        </div>
        {
          loading && 
          <div className="mb2">
            <Loader url={url}/>
          </div>
        }
        <div className="container mb2">
          <div className="row">
            {animes.map((item,key) =>
              (<div className="col-md-4 mb2" key={key}>
                <AnimeCard {...item} />
              </div>)
            )}
          </div>
        </div>
        <div>
            <Pagination
              {...this.state}
              lastPage={lastPage}
              navigateToParams={this.navigateToParams}
            />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  animes: state.animes.animes,
  lastPage: state.animes.lastPage,
  loading: state.animes.loading,
  url: state.animes.url
});
export default connect(mapStateToProps, { fetchMoreAnimes, searchAnimes })(Home);