import React, { Component } from 'react';
import ReactWordcloud from 'react-wordcloud';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Influencers from './Influencers';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            {children}
          </div>
        )}
      </div>
    );
}

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.value = props.value;
        this.state = {
            feedsData: [],
            wordCloudData: [],
            visiblePosts: 0,
            selectedTab: 0
        }
    }

    setSelectedTab= (newValue) => {
        this.setState({selectedTab: newValue});
    };

    handleChange = (event, newValue) => {
       this.setSelectedTab(newValue);
    };

    a11yProps = (index) => {
        return {
          id: `scrollable-auto-tab-${index}`,
          'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    getDateFromTimestamp = (timestamp) => {
        var date = new Date(timestamp * 1000);

        var year = date.getFullYear();
        var month = Intl.DateTimeFormat('en', { month: 'long' }).format(date);
        var day = date.getDate();
        var time = Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(date);

        const ordinal = function(d) {
            switch (d % 10) {
              case 1:  return "st";
              case 2:  return "nd";
              case 3:  return "rd";
              default: return "th";
            }
          }

        var formattedTime = month + ' ' + day + ordinal(day) + ', ' + year + ' at ' + time;
        return formattedTime;
    }

    render() {
        
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                    value={this.state.selectedTab}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Feeds" {...this.a11yProps(0)} />
                        <Tab label="Influencers" {...this.a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.selectedTab} index={0}>
                    <div style={{ backgroundColor: '#efefef', height: '300px', width: '100%' }}>
                        <ReactWordcloud callbacks={{getWordTooltip: word => `${word.text} - mentioned in ${(word.value/this.state.visiblePosts)*100}% of visible posts`,}} words={this.state.wordCloudData} />
                        <div>
                            <ul className='feedsList'>
                            {this.state.feedsData.map((post, index) => {
                                if(post.type == 'twitter') {
                                    return (
                                        <li className='feedsListItem' key={post.url}>
                                            <div className='postIconContainer'><div className='postIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={post.profile_image}/></div></div>
                                            <div className='postDataContainer'>
                                                <div className='postDateTime'>{this.getDateFromTimestamp(post.time)}</div>
                                                <h6 className='postBody'>{post.body}</h6>
                                                <div className='postDateTime'>Social Score: {post.social_score} {post.retweets ? 'Retweets: ' + post.retweets : ''} {post.likes ? 'Likes: ' + post.likes : ''}</div>
                                            </div>
                                        </li>
                                    );
                                }
                                else if(post.type == 'reddit') {
                                    return (
                                        <li className='feedsListItem' key={post.url}>
                                            <div className='postIconContainer'><div className='postIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={require('./assets/reddit-icon.svg')}/></div></div>
                                            <div className='postDataContainer'>
                                                <div className='postDateTime'>{this.getDateFromTimestamp(post.time)}</div>
                                                <h5 className='postBody'>{post.title}</h5>
                                                <h6 className='postBody'>{post.body}</h6>
                                                <div className='postDateTime'>Social Score: {post.social_score}</div>
                                            </div>
                                        </li>
                                    );
                                }
                                else if(post.type == 'news') {
                                    return (
                                        <li className='feedsListItem' key={post.url}>
                                            <div className='postIconContainer'><div className='postIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={post.thumbnail}/></div></div>
                                            <div className='postDataContainer'>
                                                <div className='postDateTime'>{this.getDateFromTimestamp(post.time)}</div>
                                                <h5 className='postBody'>{post.title}</h5>
                                                <div className='postDateTime'>Social Score: {post.social_score} {post.shares ? 'Shares: ' + post.shares : ''}</div>
                                            </div>
                                        </li>
                                    );
                                }
                                else if(post.type == 'link') {
                                    return (
                                        <li className='feedsListItem' key={post.url}>
                                            <div className='postIconContainer'><div className='postIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={post.thumbnail}/></div></div>
                                            <div className='postDataContainer'>
                                                <div className='postDateTime'>{this.getDateFromTimestamp(post.time)}</div>
                                                <h5 className='postBody'>{post.title}</h5>
                                                <div className='postDateTime'>Social Score: {post.social_score} {post.shares ? 'Shares: ' + post.shares : ''}</div>
                                            </div>
                                        </li>
                                    );
                                }
                                else if(post.type == 'medium') {
                                    return (
                                        <li className='feedsListItem' key={post.url}>
                                            <div className='postIconContainer'><div className='postIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={post.thumbnail}/></div></div>
                                            <div className='postDataContainer'>
                                                <div className='postDateTime'>{this.getDateFromTimestamp(post.time)}</div>
                                                <h5 className='postBody'>{post.title}</h5>
                                                <div className='postDateTime'>Social Score: {post.social_score} {post.shares ? 'Shares: ' + post.shares : ''}</div>
                                            </div>
                                        </li>
                                    );
                                }
                                else if(post.type == 'youtube') {
                                    return (
                                        <li className='feedsListItem' key={post.url}>
                                            <div className='postIconContainer'><div className='postIcon'><img style={{ width: 35, height: 35, borderRadius: '50%' }} src={post.thumbnail}/></div></div>
                                            <div className='postDataContainer'>
                                                <div className='postDateTime'>{this.getDateFromTimestamp(post.time)}</div>
                                                <h5 className='postBody'>{post.title}</h5>
                                                <div className='postDateTime'>Social Score: {post.social_score} {post.shares ? 'Shares: ' + post.shares : ''}</div>
                                            </div>
                                        </li>
                                    );
                                }
                            })}
                            </ul>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.selectedTab} index={1}>
                    <Influencers value={this.value}></Influencers>
                </TabPanel>
            </div>
        );
    }
  
    componentDidMount(){
        fetch('https://api.lunarcrush.com/v2?data=feeds&key=12jj7svid98m4xyvzmaalk4&page=1&limit=30&symbol=' + this.value)
        .then(function(response) {
            return response.json();
        })
        .then(res => {
            var myData = res.data;
            var wordsData = {};
            var wordsDataArray = [];
            var visiblePostsCount = myData.length;
            for(var i=0; i<myData.length; i++ ) {
                var body = myData[i].body;
                var title = myData[i].title;
                var desc = myData[i].description;
                var words = [];
                var thisPostWords = {};
                if(body) {
                    words = body.split(" ");
                }
                else if(desc) {
                    words = desc.split(" ");
                }
                else if(title) {
                    words = title.split(" ");
                }

                for(var j=0; j<words.length; j++) {
                    var word = words[j];
                    if(!(word in thisPostWords)) {
                        if(word in wordsData) {
                            wordsData[word] = wordsData[word] + 1; 
                        }
                        else {
                            wordsData[word] = 1;
                        }
                        thisPostWords[word] = 1;
                    }
                }
            }
            let keys = Array.from( Object.keys(wordsData) );
            for(var i=0; i< keys.length; i++) {
                wordsDataArray.push({text: keys[i], value: wordsData[keys[i]]});
            }
            this.setState({feedsData: myData, wordCloudData: wordsDataArray, visiblePosts: visiblePostsCount});
        });
	}
}
export default Feeds;