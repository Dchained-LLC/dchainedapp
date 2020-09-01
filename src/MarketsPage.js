import React, { Component } from 'react';
import GlobalsCarousel from './GlobalsCarousel';
import MarketsTable from './MarketsTable';

class MarketsPage extends Component {
    constructor(props) {
        super(props);
        this.updatePage = props.updatePage;
    }

    render() {
        return (
            <div>
                <GlobalsCarousel></GlobalsCarousel>
                <MarketsTable updatePage = {this.updatePage}></MarketsTable>
            </div>
        );
    }
}
export default MarketsPage;