<template>
    <div>
        <FilterTransfer />
        <Tabs
            @click-tickets-low-cost="onClickLowCost"
            @click-tickets-fast-flight="onClickFastFlight"
        />
        <Tickets />
    </div>

</template>

<script>
import FilterTransfer from '../components/FilterTransfer.vue'
import Tabs from '../components/Tabs.vue'
import Tickets from './Tickets.vue'

import { getTicketsUrl } from '../constants.js';

export default {
    components: {
        FilterTransfer,
        Tabs,
        Tickets,
    },
    data() {
        return {
            searchId: '',
            tickets: [],
        };
    },
    async created () {
        await this.getSearchId();
        await this.getTickets();

        this.normalizeDateTickets();
        this.normalizeDurationTickets();
    },
    methods: {
        async getSearchId() {
            const responseSearchId = await fetch('https://front-test.beta.aviasales.ru/search'); // {"searchId":"4niyd"}
            const { searchId } = await responseSearchId.json(); // { searchId: "4niyd" }
            this.searchId = searchId;
            
        },

        async getTickets() {
            const responseTickets = await fetch(`${getTicketsUrl}?searchId=${this.searchId}`);
            const { tickets, stop } = await responseTickets.json();

            if( stop ) {
                return;
            }

            this.tickets = tickets;
        },

        onClickLowCost() {
            this.tickets.sort( ( currentTicket, nextTicket ) => {
                return currentTicket.price - nextTicket.price;
            });
        },

        onClickFastFlight() {
            this.tickets.sort( ( currentTicket, nextTicket ) => {
                return currentTicket.segments[0].duration - nextTicket.segments[0].duration;
            });
        },

        normalizeDateTickets() {
            // date: "2022-02-05T06:44:00.000Z"
            // date: { hours: 6, minutes: 44, fullDate: '05-02-2022' }
            this.tickets = this.tickets.map( ( ticket ) => {
                
                const dateTicketThere = new Date(ticket.segments[0].date);
                const fullDateThere = `${dateTicketThere.getDate()}-${dateTicketThere.getMonth() + 1}-${dateTicketThere.getFullYear()}`;
                ticket.segments[0].date = {
                    minutes: dateTicketThere.getMinutes(),
                    hours: dateTicketThere.getHours(),
                    fullDate: fullDateThere,
                };

                const dateTicketBack = new Date(ticket.segments[1].date);
                const fullDateBack = `${dateTicketBack.getDate()}-${dateTicketThere.getMonth() + 1}-${dateTicketBack.getFullYear()}`;
                ticket.segments[1].date = {
                    minutes: dateTicketBack.getMinutes(),
                    hours: dateTicketBack.getHours(),
                    fullDate: fullDateBack,
                };

                return ticket;
            });
        },

        normalizeDurationTickets() {
            this.tickets = this.tickets.map( ( ticket ) => {
                ticket.segments[0].duration = this.getHoursAndMinutes(ticket.segments[0].duration);
                ticket.segments[1].duration = this.getHoursAndMinutes(ticket.segments[1].duration);

                return ticket;
            } );
        },

        getHoursAndMinutes( mins ) {
            let hours = Math.trunc( mins / 60 );
            let minutes = mins % 60;
            return `${hours} ч. ${minutes} м.`;
        }
    }
}

</script>