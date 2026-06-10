import Link from 'next/link';

const NAV_OPTIONS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  {path: '/projects', label: 'Projects' },
  { path: '/uses', label: 'Uses' },
  { path: '/contact', label: 'Contact' }
];

function Navbar({ options = NAV_OPTIONS }) {
  return (
    <nav
      data-testid="nav"
      className="inline-block bg-zinc-700 dark:bg-zinc-300 border border-zinc-600 dark:border-zinc-400 rounded-full transition-colors duration-[800ms] hover:bg-zinc-900 dark:hover:bg-zinc-100"
    >
      <ul data-testid="ul" className="flex gap-6 px-6 items-center h-8">
        {options &&
          options.map((option, index) => (
            <li data-testid={`li${index}`} key={index}>
              <Link
                href={option.path}
                data-testid={`a${index}`}
                className="font-bold text-zinc-100 dark:text-zinc-900 transition-colors duration-150 hover:underline hover:decoration-[#F2360C] active:text-[#F2360C] active:no-underline"
              >
                {option.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Navbar;
