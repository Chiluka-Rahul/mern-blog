import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link , useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice';

export const Header = () => {
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleSignout = async () => {
        try {
          const res = await fetch('/server/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center text-sm sm:text-xl font-semibold'>
            <span>Blog Posts</span>
        </Link>
        <form>
            <TextInput 
                type='text'
                placeholder='Search..'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color="gray" pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            {currentUser ? (
                <Dropdown
                    arrowIcon ={false}
                    inline
                    label = {
                        <Avatar 
                            alt='user'
                            img={currentUser.
                                profilePicture}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                </Dropdown>

            ) : (
                <Link to="/sign-in">
                    <Button>
                        Sign In
                    </Button>
                </Link>
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === "/"} as={'div'}>
                <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={'div'}>
                <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={'div'}>
                <Link to="/projects">Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
