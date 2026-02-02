
export const Footer = () => {
  return (
    <>
        <footer className='h-[5vh] bg-gray-200 shadow w-full '>
        <div className="flex h-full items-center">
          <p className="text-gray-500 text-sm text-center w-full ">© 2023 Evaluatec —
            <a href="https://www.linkedin.com/in/jes%C3%BAs-aldair-torres-flores-/" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">Aldair Torres</a>
            <span> & </span>
            <a href="https://www.linkedin.com/in/jes%C3%BAs-aldair-torres-flores-/" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">Alexis Vasquez</a>
          </p>
          <span className="inline-flex justify-center pr-10">
            <a  href='https://www.facebook.com/TecNMAcapulco' target='_blank'
                className="text-gray-500 hover:text-facebook transition-transform transform hover:scale-125 cursor-pointer" >
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-9 h-9" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a  href='https://twitter.com/TecNMAcapulco' target='_blank'
                className="ml-3 text-gray-500 hover:text-twiter transition-transform transform hover:scale-125 cursor-pointer">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-9 h-9" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a  href='https://www.instagram.com/tecnmacapulco/' target='_blank'
                className="ml-3 text-gray-500 hover:text-instagram transition-transform transform hover:scale-125 cursor-pointer">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-9 h-9" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            
          </span>
        </div>
      </footer>
    </>
  )
}
