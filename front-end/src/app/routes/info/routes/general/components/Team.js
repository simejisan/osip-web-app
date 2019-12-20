import React from 'react';

const Team = ({team}) => {
    const {name, destination, description, image, link} = team;

    return (
        <div className="m-1">
            <div className="jr-card px-0 pt-sm-5 text-center">
                <img className="size-100 avatar-shadow rounded-circle mx-auto mb-2" src={image} alt="Team-member"/>
                <div className="card-body bg-transparent">
                    <h3 className="card-title font-weight-bold">{name}</h3>
                    <span className="post-designation font-weight-semibold">{destination}</span>
                    <p className="card-text">{description}</p>
                    {/*<Button color="primary"><IntlMessages id="extraPages.goSomewhere"/></Button>*/}
                    <a href={link} target="_blank" rel="noopener noreferrer"><i
                        className="zmdi zmdi-facebook-box zmdi-hc-2x"/></a>
                </div>
            </div>
        </div>
    );
};


export default Team;
