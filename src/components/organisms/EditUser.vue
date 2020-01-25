<style lang="scss" scoped>
  @import "~@/styles/constants";
  .edit-user { 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    .overlay{
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      z-index: 100;
    }
    .card{
      width: 80vw;
      max-height: 80vh;
      margin: 64px 0px;
      z-index: 105;
      position: relative;
  		.content { 
        display: flex;
        align-items: stretch;
        justify-content: center;
        height: 100%;
        @media only screen and (max-width: 900px){
          flex-direction: column;
          justify-content: flex-start;
          overflow-y: auto;
          height: 80vh
        }
        .overview-container{
          padding: 48px 32px 32px 72px;
          min-width: 240px;
          // 
          .overview-col{
            height: 100%;
            position: relative;
            .avatar { 
              width: 128px;
              height: 128px;
              border-radius: 16px;
              background-color: $b;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              .fa{
                color: #FFF;
                font-size: 60px;
              }
            }
            .header-info { 
              margin-bottom: 8px;
              .name{
                margin-bottom: 8px;
              }
              .id{
                
              }
            }
            .error{
              color: red;
            }
            .delete{
              margin-left: -16px;
              position: absolute;
              bottom: 0px;
              left: 0px;
              @media only screen and (max-width: 900px){
                bottom: -32px;
              }
            }
          }
        }
        .info-container{
          overflow-y: auto;
          position: relative;
          max-height: 80vh;
          @media only screen and (max-width: 900px){
            max-height: 100%;
            overflow: visible;
          }
          .info-col{
            padding: 32px;
            .input-row{
              display: inline-block;
              width: 250px;
              margin: 8px 16px;
            }
          }
        }
        .close{
          position: absolute;
          top: 16px;
          right: 24px;
          width: 40px;
          height: 40px;
          font-size: 20px;
          color: $input-placeholder;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover{
            cursor: pointer;
            color: $b;
            background-color: $w-20;
          }
        }
  		}
  	}
  }
</style>

<template>
  <div class="edit-user">
    <div class="overlay"></div>
    <div class="card" v-click-outside="discardChanges">
      <div class="content">
        <div class="overview-container">
          <div class="overview-col">
            <div class="avatar">
              <span class="fa fa-user"></span>
            </div>
            <div class="header-info">
              <div class="name h1" v-if="user.firstname || user.lastname">
                {{user.firstname}} {{user.lastname}}
              </div>
              <div class="name h1" v-else>
                New User
              </div>
              <div class="id" v-if="user.id">
                ID: {{user.id}}
              </div>
              <div class="created" v-if="user.created">
                Created: {{user.created}}
              </div>
            </div>
            <button-row v-if="edited">
              <btn type="fill" @click="saveChanges()"><span>Save</span></btn>
              <btn type="outline" @click="discardChanges()"><span>Discard</span></btn>
            </button-row>
            <div class="error" v-if="error_message">
              {{error_message}}
            </div>
            <btn class="delete" v-if="$store.get('users/updating_user')" @click="deleteUser()"><span>Delete</span></btn>
          </div>
        </div>
        <div class="info-container">
          <div class="info-col">
            <div v-for="prop in Object.keys(user)" class="input-row">
              <form-input :value="user[prop]" :title="prop" @input="updateActiveUser(prop, $event)"></form-input>
            </div>
          </div>
        </div>
        <div class="close" @click="discardChanges">
          <span class="fa fa-times"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Btn from "@/components/atoms/Btn.vue";
  import ButtonRow from "@/components/atoms/ButtonRow.vue";
  import In from "@/components/atoms/In.vue";
  import FormInput from "@/components/molecules/FormInput.vue";
  export default{
    components: { Btn, ButtonRow, In, FormInput },
    created(){
      this.user_copy = JSON.stringify(this.user)
    },
    computed: {
      user(){
        return this.$store.get("users/editable_user")
      },
      edited(){
        return this.user_copy != JSON.stringify(this.user)
      }
    },
    data(){
      return{
        user_copy: null,
        error_message: null,
      }
    },
    methods: {
      saveChanges(){
        if(this.$store.get('users/adding_user')){
          this.$store.dispatch('users/addUser').catch(response=>{
            this.error_message = response.data;
          });
        }else{
          this.$store.dispatch('users/updateUser', this.user);
        }
      },
      discardChanges(){
        this.$store.set('users/resetEditableUser')
      },
      deleteUser(){
        this.$store.dispatch('users/removeUser', this.user)
      },
      updateActiveUser(prop, value){
        this.$store.set('users/editable_user', Object.assign({}, this.user, {[prop]: value}))
      }
    }
  }
</script>
