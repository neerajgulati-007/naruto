import React from 'react';
import { connect } from 'react-redux';
import { fetchAnimes } from '../ducks/animes';

import AnimeCard from '../components/AnimeCard';
import Search from '../components/Search';

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
        query: queryParams.search || 'naruto',
        page: queryParams.page || 1,
        limit:  queryParams.limit || 16  
      }
    }
  }

  componentDidMount() {   
    this.props.fetchAnimes({...this.state.queryParams});
  }

  onSubmit = (queryParams) => {
   this.setState({queryParams});
   const { location: {pathname} } = this.props;
   const search = getQueryString(queryParams);
   this.props.history.push(`${pathname}?${search}`);
  }

  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) {
      this.props.fetchAnimes({...this.state.queryParams});
    }
  }

  render() {
    console.log("props are===>", this.props);
    const { animes } = this.props;
    return (
      <div>
        <Search 
          {...this.state}
          onSubmit={this.onSubmit}
        />
        <div className="container">
          <div className="row">
            {animes.map((item) =>
              (<div className="col-md-4"><AnimeCard {...item} /></div>)
            )}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  animes: state.animes
});
export default connect(mapStateToProps, { fetchAnimes })(Home);