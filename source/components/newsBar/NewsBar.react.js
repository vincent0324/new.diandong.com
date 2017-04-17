import React from 'react';
import CommentBox from './CommentBox.react';
import ShareOverlay from '../shareOverlay/ShareOverlay.react';
import NewsBarLikeButton from './NewsBarLikeButton.react';
import './newsBar.css';

class NewsBar extends React.Component {

    constructor(props) {
        super(props);
        this.showCommentBox = this.showCommentBox.bind(this);
        this.hideCommentBox = this.hideCommentBox.bind(this);
        this.showShareBox = this.showShareBox.bind(this);
        this.hideShareBox = this.hideShareBox.bind(this);
        this.state = {
            hasCommentBox: false,
            hasShare: false,
            numberOfLikes: 0
        };
    }

    showCommentBox() {
        this.setState({hasCommentBox: true});
    }

    hideCommentBox() {
        this.setState({hasCommentBox: false});
    }

    showShareBox() {
        this.setState({hasShare: true});
    }

    hideShareBox() {
        this.setState({hasShare: false});
    }

    componentDidMount() {
        let id = this.props.articleId;

        this.getNumberOfLikeRequest = $.ajax({
            url: 'http://comment.diandong.com/common/like/total',
            data: {
                uuid: id
            },
            dataType: 'jsonp',
            type: 'GET',
            success: function(result) {
                if (result.state.err) {
                    this.setState({numberOfLikes: 0});
                } else {
                    this.setState({numberOfLikes: result.data.total});
                }
            }.bind(this)
        });
    }

    componentWillUnmount() {
        this.getNumberOfLikeRequest.abort();
    }

    render() {
        return (
            <div>
                <div className="news-bar">
                    <div className="wrap clearfix">
                        <div className="comment-input fn-left" onClick={this.showCommentBox}>说点什么吧</div>
                        <div className="comment-button fn-right">
                            <a href="#article-comment" className="comment-item-number">
                                <span></span>
                                <i>24</i>
                            </a>
                            <NewsBarLikeButton numberOfLikes={this.state.numberOfLikes}/>
                            <a href="javascript:;" className="comment-share" onClick={this.showShareBox}>
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>

                <CommentBox commentState={this.state.hasCommentBox} handleClick={this.hideCommentBox}/>
                <ShareOverlay shareState={this.state.hasShare} hideShareBox={this.hideShareBox}/>
            </div>
        );
    }
};

export default NewsBar;
