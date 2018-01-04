import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  href: PropTypes.string,
};
const defaultProps = {
  alt:'image'
}

class Thumbnail extends React.Component {
  render() {
    const { src, alt, className, children, ...props } = this.props;

    return (
      <div
        className={className}
      >
        <div className="thb-img-part u_posR">
          <a className="u_txtDecoNone"><img src={src} alt={alt} className="img-responsive" /></a>
        </div>

        {children && (
          <div className="package-details flt-wth">
            {children}
          </div>
        )}
      </div>
    );
  }
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
