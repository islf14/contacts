import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Index = ({ contacts }) => {
  return (
    <AuthenticatedLayout
      header={
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Contacts
          </h2>
          <Link href={route('contact.create')}>Create Contact</Link>
        </div>
      }
    >
      <Head title="Contacts" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Visibility
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Avatar
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      contacts?.map((contact) => (
                        <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {contact.name}
                          </th>
                          <td className="px-6 py-4">
                            {contact.phone}
                          </td>
                          <td className="px-6 py-4">
                            {contact.visibility}
                          </td>
                          <td className="px-6 py-4">
                            <img src={`/storage/${contact.avatar}`} alt="" className='w-16'/>
                          </td>
                          <td className="px-6 py-4">
                            <div className='space-x-4'>
                              <Link href={route('contact.edit', [contact])}>Edit</Link>
                              <Link href={route('contact.delete', [contact])} method='delete'>Delete</Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Index