import React, { Component } from 'react';
import styled from 'styled-components';

class UnsplashCredit extends Component {
  render() {
    const { username, fullName } = this.props;
    return (
      <Wrapper>
        <Anchor
          href={`https://unsplash.com/@${username}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InnerWrapper>
            <UnsplashLogo viewBox="0 0 32 32">
              <path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z" />
            </UnsplashLogo>
          </InnerWrapper>
          <PhotographerName>
            {fullName}
          </PhotographerName>
        </Anchor>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  margin: auto;
`;

const Anchor = styled.a`
  background-color: black;
  color: white;
  text-decoration: none;
  padding: 4px 6px;
  font-family: -apple-system, BlinkMacSystemFont,
    'San Francisco', 'Helvetica Neue', Helvetica,
    Ubuntu, Roboto, Noto, 'Segoe UI', Arial,
    sans-serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
  display: inline-block;
  border-radius: 3px;
`;

const InnerWrapper = styled.span`
  display: inline-block;
  padding: 2px 3px;
`;

const UnsplashLogo = styled.svg`
  height: 12px;
  width: auto;
  position: relative;
  vertical-align: middle;
  top: -1px;
  fill: white;
`;

const PhotographerName = styled.span`
  display: inline-block;
  padding: 2px 3px;
`;

export default UnsplashCredit;
