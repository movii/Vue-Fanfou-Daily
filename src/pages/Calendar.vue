<template>
  <div class="calendar__contain" v-if="months">
    <div class="calendar__hd" v-show="months">
      <div><span>周一</span></div>
      <div><span>周二</span></div>
      <div><span>周三</span></div>
      <div><span>周四</span></div>
      <div><span>周五</span></div>
      <div><span>周六</span></div>
      <div><span>周日</span></div>
    </div>
    <div class="calendar__bd" v-for="month in months" :key="month.uid">
      <div class="calendar__title">
        {{ month.year }} 年 {{ month.month }} 月
      </div>
      <div v-for="day in month.days" :key="day.date" class="day">
        <template v-if="day.value == 'placeholder'">
          <div class="placeholder" />
        </template>
        <template v-else-if="day.value == 'empty'">
          <div class="empty">{{ day.content }}</div>
        </template>
        <template v-else>
          <router-link
            v-if="day.value == 'value'"
            :class = "day.isToday ? 'date today': 'date'"
            tag = "div"
            :to = "{ name: 'day', params: { day: day.isToday ? 'today' : day.entry.split('.')[0]} }">
            {{ day.content }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../utils/Calendar'

export default {
  name: 'calendar',

  data () {
    return {
      months: []
    }
  },

  created () {
    this.makeCalendar()
  },

  methods: {
    makeCalendar () {
      const cal = new Calendar()
      this.$store.dispatch('FETCH_ENTRIES').then(({ entries }) => {
        cal.generate(entries).then(months => {
          this.months = months
        })
      })
    }
  }
}
</script>

<style lang="scss" scpoed>
@media (min-width: 800px) {
  .calendar__contain,
  .calendar__hd {
    max-width: 600px;
    margin   : 0 auto;
  }
}
.calendar__contain {
  position     : relative;
  overflow     : hidden;
  margin-bottom: 1.325rem;
}
.calendar__hd {
  @include flexbox();
  @include flex-flow(row, nowrap);
  @include align-self(center);
  background : #F8F8F8;
  color      : #96999B;
  position   : fixed;
  height     : 20px;
  overflow   : hidden;
  line-height: 20px;
  width      : 100%;
  z-index    : 100;
  max-width  : 600px;
}
.calendar__hd div {
  @include flex(1);
}
.calendar__hd div span {
  width      : 100%;
  display    : inline-block;
  text-align : center;
  font-size  : .6rem;
  height     : 20px;
  line-height: 20px;
}
.calendar__title {
  width        : 100%;
  display      : inline-block;
  text-align   : left;
  font-size    : .7rem;
  height       : 30px;
  line-height  : 30px;
  padding      : 0 .325rem;
  box-sizing   : border-box;
  background   : #F5F5F5;
  margin-bottom: 1px;
  position     : relative;
  z-index      : 0;
}
.calendar__bd {
  @include flexbox();
  @include flex-flow(row, wrap);
  @include align-self(center);
  position: relative;
  z-index : 0;
}
.calendar__bd:nth-child(2) {
  margin-top: 22px;
}
.calendar__title {
  width: 100%;
}
.calendar__bd .day {
  @include flex-basis(calc(100% * (1/7)));
  position   : relative;
  user-select: none;
  z-index    : 0;
}
.calendar__bd .day:hover {
  z-index: 999;
}
.calendar__bd .day:hover div.date {
  cursor    : pointer;
  font-size : 1.225rem;
  color     : #18C1F9;
  background: #ffffff;
  border    : 2px solid #f5f5f5;
  z-index   : 999;
}
.calendar__bd .day:before {
  content       : '';
  width         : 100%;
  display       : block;
  padding-bottom: 100%;
}
.calendar__bd .day div.date {
    transition: 
      background .3s ease-out,
      box-shadow .2s ease-in-out,
      font-size .2s ease-in-out, 
      color .2s ease-in-out;
}
.calendar__bd .day div.date,
.calendar__bd .day div.placeholder,
.calendar__bd .day div.empty {
  @include flexbox();
  @include align-items(center);
  @include justify-content(center);
  font-size : 1rem;
  position  : absolute;
  left      : 0;
  top       : 0;
  width     : 100%;
  height    : 100%;
  text-align: center;
  padding   : .325rem;
  box-sizing: border-box;
  border    : 1px solid #FFFFFF;
  background: #F5F5F5;
  color     : #000000;
}
.calendar__bd .day div.today {
  background: #FFFFFF;
  color     : #18C1F9;
}
.calendar__bd .day div.placeholder {
  overflow  : hidden;
  background: #ffffff;
}
.calendar__bd .day div.empty {
  color     : #cccccc;
  background: #F5F5F5;
}
</style>
