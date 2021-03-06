import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export class SingleBeer extends React.Component {

    state = {
        beer: null,
        loading: true
    };

    componentDidMount() {
        // id like in the App.js Route path='/beers/:id'
        const beerId = this.props.match.params.id;

        axios
            .get('https://ih-beers-api2.herokuapp.com/beers/' + beerId)
            .then(resp => {
                this.setState({
                    beer: resp.data,
                    loading: false
                });
            });
    }

    // first render action happens with value null for the beer property (initial state value)
    // you will need if else statement or setTimeout inside setState (inside promise)
    render() {
        return (
            <div>
                <Navbar />
                {/* Bootstrap spinner */}
                {this.state.loading && (<div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)}

                {/* first data has to be there (loaded) */}
                {/* if data is not there you would try to show for example this.state.beer.null instead of this.state.beer.image_url and example this.state.beer.null will always cause errors */}
                {this.state.beer && (
                    <div>
                        <img src={process.env.PUBLIC_URL + this.state.beer.image_url} alt='featured beer' />
                        <h2>{this.state.beer.name}</h2>
                        <p>{this.state.beer.tagline}</p>
                        <p>{this.state.beer.first_brewed}</p>
                        <p>{this.state.beer.attenuation_level}</p>
                        <p>{this.state.beer.description}</p>
                        <p>{this.state.beer.contributed_by}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default SingleBeer;