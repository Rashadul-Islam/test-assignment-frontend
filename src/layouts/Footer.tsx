import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap justify-between text-center">
          <div className="w-1/2 lg:w-1/4 mb-4">
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Subscribe</li>
              <li className="mb-2">Contact</li>
            </ul>
          </div>
          <div className="w-1/2 lg:w-1/4 mb-4">
            <h4 className="text-lg font-bold mb-4">Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/submit-form">Submit Form</Link>
              </li>
              <li className="mb-2">
                <Link to="/edit-form">Edit Form</Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 lg:w-1/4 mb-4">
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul>
              <li className="mb-2">FAQ</li>
              <li className="mb-2">Documentation</li>
              <li className="mb-2">Forum</li>
            </ul>
          </div>
          <div className="w-1/2 lg:w-1/4 mb-0">
            <h4 className="text-lg font-bold mb-4">Social</h4>
            <ul className="flex items-center justify-center">
              <li className="mr-3">
                <a href="#" className="text-gray-500 hover:text-white">
                  <FaFacebookSquare size={30} />
                </a>
              </li>
              <li className="mr-3">
                <a href="#" className="text-gray-500 hover:text-white">
                  <FaTwitterSquare size={30} />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-white">
                  <FaInstagramSquare size={30} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white pt-4 mt-8">
          <p className="text-sm text-center text-white">
            &copy; {new Date().getFullYear()} Coding Challenge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
