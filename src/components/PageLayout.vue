<template>
  <div class="min-h-screen bg-gray-100">
    <div class="bg-indigo-600 pb-32">
      <nav
        class="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none"
      ></nav>
      <header class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">Toothy Tron</h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        <div
          class="bg-white grid grid-cols-6 rounded-lg shadow px-5 py-6 sm:px-6"
        >
          <div class="col-span-2">
            <slot name="left"></slot>
          </div>
          <div class="col-span-4">
            <slot name="right"></slot>
          </div>
          <div class="col-span-6 mt-4">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
