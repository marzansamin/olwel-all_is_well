import { useLocation, Link } from 'react-router-dom'

const Breadcrumbs = () => {
  // const breadcrumbData : {label: String, path: String}[] = [
  //   {label: 'Home', path: '/'},
  //   {label: 'Dashboard', path: '/dashboard'},
  //   {label: 'Doctor List', path: '/dashboard/doctors'},
  //   {label: 'Add Doctor', path: '/dashboard/add-doctor'},
  //   {label: 'Patient List', path: '/dashboard/patient'},
  //   {label: 'Add Patient', path: '/dashboard/add-patient'},
  //   {label: 'Departments List', path: '/dashboard/departments'},
  //   {label: 'Add Departments', path: '/dashboard/add-departments'},
  //   {label: 'Schedule List', path: '/dashboard/schedule'},
  //   {label: 'Add Schedule', path: '/dashboard/add-departments'},
  //   {label: 'Appointment List', path: '/dashboard/appointment'},
  //   {label: 'Add Appointment', path: '/dashboard/add-departments'},
  //   {label: 'Prescription List', path: '/dashboard/precription'},
  //   {label: 'Add Prescription', path: '/dashboard/add-precription'},
  //   {label: 'Reports List', path: '/dashboard/reports'},
  //   {label: 'Add Report', path: '/dashboard/add-report'},
  // ];
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x)

  return (
    <nav className='text-[#202020] my-4'>
      <ul className='flex'>
        <li>
          <Link to='/' className='hover:text-[#1C4E80] hover:underline text-2xl'>Home</Link>
        </li>
        {
          pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            const to = `/${pathnames.slice(0, index+1).join('/')}`
            const title = value

            return(
              <li key={to}>
                <span className='mx-2 text-2xl'>/</span>
                {
                  last ? (
                    <span className='text-[#1C4E80] text-2xl'>{title}</span>
                  ) : (
                    <Link to={to} className='hover:text-[#1C4E80] hover:underline text-2xl'>{title}</Link>
                  )
                }
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Breadcrumbs