import React from 'react';

import './less/footer.less';

class Footer extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="foot">
                <div className="copyright">
                    <p className="my-copyright-text">Copyright©yangyang.zhang@wenba100.com . All Rights Reserved  2013-2015   </p>
                </div>
            </div>
        );
    }
}

export default Footer;
