<template>
  <div :class="className + classObject[type]">
    <template  v-if="hasIcon" >
       <slot name="icon"></slot>
    </template>
		<span v-if="$slots.default">
			<slot></slot>
		</span>
  </div>
</template>

<script>
  export default {
    name: 'eff-Button',
    data() {
      return {
        classObject:{
          'default': 'eff-button',
          'sparkled': 'eff-button eff-btn-sparkled'
        }
      }
    },
    props:{
			type:{
				type:String,
				default:'default',			
			},
      className:{
        type: String,
        default:''
      },
      hasIcon:{
        type: Boolean,
        default: false
      }
    },
    watch:{
    }
  }
</script>

<style lang="scss" scoped>


.eff-button{
	display: inline-block;
	color: #333333;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 10px;
	border: 1px solid #afafaf;
	background: #ffffff;
	z-index: 0;
	text-align: center;
}
.eff-button-round{
	border-radius: 50%;
}



@keyframes rotate {
	100% {
		transform: translate(-50%, -50%) rotate(1turn);
	}
}

.eff-btn-sparkled {
	position: relative;
	background: #000000;
	color: #0ebeff;
	border-radius: 10px;
	overflow: hidden;
 	transition: .3s;
	-webkit-box-reflect: below 10px linear-gradient(transparent, rgba(0, 0, 0, .4));
	filter: hue-rotate(180deg);
	&:hover {
		color: #fff;
		box-shadow: 0 0 5px #0ebeff,	0 0 25px #0ebeff;
		&::after,
		&::before {
			transition: .3s;
			background: #0ebeff;
		}
	}
	&::before {
		content: '';
		position: absolute;
		z-index: -2;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 150%;
		height: 300%;
		background-color: #000;
		background-repeat: no-repeat;
		background-size: 50% 50%;
		background-position: 0 0;
		background-image: conic-gradient(#0ebeff, #0ebeff);
		animation: rotate 2s linear infinite;
	}
	
	&::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 2px;
		top: 2px;
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		background: #000;
		border-radius: 10px;
	}
}
</style>