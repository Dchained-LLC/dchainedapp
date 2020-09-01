import React, { Component } from 'react';

class Influencers extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.state = {
            influencersData: []
        }
    }

    render() {
        
        return (
            <div>
                <ul className='influencersList'>
                    {this.state.influencersData.map((influencer, index) => (
                        <li className='influencersListItem'>
                            <div className='influencerIconContainer'>
                                <div className='influencerIndex'>{index + 1}</div>
                                <div className='influencerIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={influencer.profile_image}/></div>
                            </div>
                            <div className='influencerDataContainer'>
                                <div className='influencerName'><span className='influencerDisplayName'>{influencer.display_name}</span> <span className='influencerScreenName'>@{influencer.twitter_screen_name}</span></div>
                                <div className='influencerInfo'><strong>{influencer.following}</strong> following <strong>{influencer.followers}</strong> followers <strong>{influencer.engagement}</strong> engagements <strong>{influencer.volume}</strong> posts</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
  
    componentDidMount(){
        fetch('https://api.lunarcrush.com/v2?data=influencers&key=12jj7svid98m4xyvzmaalk4&limit=30&symbol=' + this.value)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myData = res.data;
            this.setState({influencersData: myData});
        });
	}
}
export default Influencers;