'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  /*
  Esta función envolverá el contenido de handleSearchy solo ejecutará
  el código después de un tiempo específico una vez que el usuario haya 
  dejado de escribir (300 ms).
  */
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
   
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

/*Aquí hay un desglose de lo que está sucediendo:

${pathname}es la ruta actual, en su caso "/dashboard/invoices",.

A medida que el usuario escribe en la barra de búsqueda, params.
toString()traduce esta entrada a un formato compatible con URL.

replace(${pathname}?${params.toString()})actualiza la URL con los 
datos de búsqueda del usuario. Por ejemplo, /dashboard/invoices?query=leesi el usuario busca "Lee".

La URL se actualiza sin recargar la página, gracias a la navegación 
del lado del cliente de Next.js (que conoció en el capítulo sobre navegación entre páginas ). */