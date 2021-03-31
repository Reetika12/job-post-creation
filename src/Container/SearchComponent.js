import React from 'react';
import classNames from 'classnames';
import "./styles.css";

function SearchBar(props) {
    const {
        searchTerm = '',
        placeholder = 'Search',
        classes = '',
        onSubmit,
        onChange
    } = props;

    return (

        <React.Fragment>

            <form onSubmit={onSubmit}>      
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onChange}
                    kalyani kongari
                    onChange={this.props.onChange}
                    className={classNames('searchBar', classes)}
                     placeholder={placeholder}
                />
            </form>

        </React.Fragment>

    )

}


export default SearchBar;