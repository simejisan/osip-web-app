import React from 'react';
import ContainerHeader from 'components/ContainerHeader'
import IntlMessages from 'util/IntlMessages';

const ContactUs = ({match}) => {
    return (
        <div className="animated slideInUpTiny animation-duration-3">
            <ContainerHeader title={<IntlMessages id="pages.contactUs"/>} match={match}/>
            <div className="row">
                <div className="col-lg-9 col-md-8 col-sm-7 col-12">
                    <form action="" className="contact-form jr-card">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold mb-2"><IntlMessages id="contactUs.askHelp"/></label>
                                    <textarea className="form-control form-control-lg" rows="9" placeholder="..."/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-group mb-0">
                                    <button type="submit" className="btn btn-primary"><IntlMessages
                                        id="contactUs.submit"/></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-lg-3 col-md-4 col-sm-5 col-12">
                    <div className="contact-block jr-card py-5 px-4">
                        <ul className="contact-info vertical">
                            <li>
                                <i className="zmdi zmdi-pin zmdi-hc-fw"/>
                                <div className="contact-body">
                                    <h4 className="text-uppercase"><IntlMessages id="appModule.address"/></h4>
                                    <address className="mb-0">
                                        <IntlMessages id="osip.address"/>
                                        <br/>
                                        <IntlMessages id="osip.city"/>
                                    </address>
                                </div>
                            </li>

                            <li>
                                <i className="zmdi zmdi-phone zmdi-hc-fw"/>
                                <div className="contact-body">
                                    <h4 className="text-uppercase"><IntlMessages id="appModule.phone"/></h4>
                                    <div>
                                        <a href={"tel:" + <IntlMessages id="osip.phone1"/>} target="_blank"
                                           rel="noopener noreferrer">
                                            <span className="jr-link text-primary disable-link">
                                                <IntlMessages id="osip.phone1"/>
                                            </span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href={"tel:" + <IntlMessages id="osip.phone2"/>} target="_blank"
                                           rel="noopener noreferrer">
                                            <span className="jr-link text-primary disable-link">
                                                <IntlMessages id="osip.phone2"/>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <i className="zmdi zmdi-email zmdi-hc-fw"/>
                                <div className="contact-body">
                                    <h4 className="text-uppercase"><IntlMessages id="appModule.email"/></h4>
                                    <div>
                                        <a href={"mailto:" + <IntlMessages id="osip.email"/>} target="_blank"
                                           rel="noopener noreferrer">
                                            <span className="text-primary jr-link"><IntlMessages
                                                id="osip.email"/></span>
                                        </a>
                                    </div>
                                    <div className="icons-wrapper">
                                        <span className="icon facebook-icon jr-link">
                                            <i className="zmdi zmdi-facebook"/>
                                        </span>

                                        <span className="icon twitter-icon jr-link">
                                            <i className="zmdi zmdi-twitter"/>
                                        </span>

                                        <span className="icon google-icon jr-link">
                                            <i className="zmdi zmdi-google-plus"/>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

