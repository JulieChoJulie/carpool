import React from 'react';
import { Link, IndexLink } from 'react-router'

const NavItem = () => {
    const { router } = this.context
    const { index, onlyActiveOnIndex, to, children, ...props } = this.props

    const isActive = router.isActive(to, onlyActiveOnIndex)
    const LinkComponent = index ? Link : IndexLink

    return (
        <li className={isActive ? 'active' : ''}>
            <LinkComponent {...props}>{children}</LinkComponent>
        </li>
    )
};

export default NavItem;
//
// class NavItem extends React.Component {
//     render () {
//         const { router } = this.context
//         const { index, onlyActiveOnIndex, to, children, ...props } = this.props
//
//         const isActive = router.isActive(to, onlyActiveOnIndex)
//         const LinkComponent = index ? Link : IndexLink
//
//         return (
//             <li className={isActive ? 'active' : ''}>
//                 <LinkComponent {...props}>{children}</LinkComponent>
//             </li>
//         )
//     }
// }