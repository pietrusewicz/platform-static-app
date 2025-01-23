<template>
  <div class="flex mt-4 relative">
    <i class="flex place-items-center place-content-center w-xs h-xs">
      <slot name="icon"></slot>
    </i>
    <div class="flex-1 ml-1">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>
