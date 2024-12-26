import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const Edit = ({contact}) => {
  const { data, setData, errors, post, recentlySuccessful, processing } = useForm({
    name: contact.name,
    avatar: null,
    phone: contact.phone,
    visibility: contact.visibility
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('contact.update', contact));
  }

  return (
    <AuthenticatedLayout
      header={
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Update Contact
          </h2>
          <Link href={route('contact.index')}>Contacts</Link>
        </div>
      }
    >
      <Head title="Edit" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={submit} className='space-y-3'>
                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-green-600 text-center">
                    Updated successfully.
                  </p>
                </Transition>
                <div>
                  <InputLabel htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Lucas"
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                  <InputLabel htmlFor="phone" value="Phone" />
                  <TextInput
                    id="phone"
                    type="text"
                    name="phone"
                    value={data.phone}
                    placeholder="+51980893423"
                    className="mt-1 block w-full"
                    autoComplete="phone"
                    isFocused={true}
                    onChange={(e) => setData('phone', e.target.value)}
                  />
                  <InputError message={errors.phone} className="mt-2" />
                </div>
                <div>
                  <InputLabel htmlFor="avatar" value="Avatar" />
                  <TextInput
                    id="avatar"
                    type="file"
                    name="avatar"
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('avatar', e.target.files[0])}
                  />
                  <InputError message={errors.avatar} className="mt-2" />
                </div>
                <div>
                  <InputLabel htmlFor="visibility" value="Visibility" />
                  <select
                    id='visibility'
                    name='visibility'
                    defaultValue={data.visibility}
                    onChange={(e) => setData('visibility', e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                  <InputError message={errors.visibility} className='mt-2' />
                </div>
                <div className='flex justify-center'>
                  <PrimaryButton disabled={processing}>Update</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Edit