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
      &.background{
        flex-basis: 800px;
        height: 80vh;
        margin: 64px 0px;
        z-index: 105;
        position: relative;
        background-color: $w-10;
        overflow: hidden;
        @media only screen and (max-width: 900px){
          flex-basis: 400px;
        }
      }
  		.content { 
        display: flex;
        // align-items: stretch;
        align-items: flex-start;
        justify-content: center;
        height: 100%;
        @media only screen and (max-width: 900px){
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          overflow-y: auto;
          height: 80vh
        }
        .overview-container{
          padding: 48px 32px 32px 72px;
          width: 240px;
          .overview-col{
            height: 100%;
            .avatar { 
              width: 160px;
              height: 160px;
              border-radius: 50%;;
              background: linear-gradient(0deg, #49a3df 0%, #6db5e5 100%);
              margin-bottom: 16px;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              box-shadow: $z_depth_1;
              overflow: hidden;
              .fa{
                color: #FFF;
                font-size: 134px;
                margin-bottom: -16px;
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
              bottom: 40px;
              left: 72px;
              @media only screen and (max-width: 900px){
                display: block;
                position: relative;
                bottom: auto;
                left: auto;
              }
            }
          }
        }
        .info-container{
          overflow-y: auto;
          position: relative;
          max-height: 80vh;
          flex: 1;
          @media only screen and (max-width: 900px){
            max-height: 100%;
            overflow: visible;
          }
          .scrollable{
            padding: 64px 80px 64px 16px;
            max-width: 500px;
            @media only screen and (max-width: 900px){
              padding: 16px 32px 64px 32px;
            }
            .card{
              width: 100%;
              &.info-group{
                margin-bottom: 16px;
              }
              .drop-down-area{
                width: 100%;
                .info-col{
                  padding: 24px 40px 32px 40px;
                  .form-input{
                    margin-bottom: 16px;
                  }
                }
              }
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
    <div class="card background" v-click-outside="clickOutsideDiscardChanges">
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
          <div class="scrollable">
            <div class="card info-group">
              <drop-down-area title="User Info" icon="fa-user-edit" :start-open="true">
                <div class="info-col">
                  <form-input :value="user.firstname" title="First Name" @input="updateActiveUser('firstname', $event)"></form-input>
                  <form-input :value="user.lastname" title="Last Name" @input="updateActiveUser('lastname', $event)"></form-input>
                  <form-input :value="user.username" title="Username" @input="updateActiveUser('username', $event)"></form-input>
                  <form-input :value="user.email" title="Email" @input="updateActiveUser('email', $event)"></form-input>
                  <form-input :value="user.addresses" title="Addresses" @input="updateActiveUser('addresses', $event)"></form-input>
                  <form-input :value="user.phoneNumbers" title="Phone Numbers" @input="updateActiveUser('phoneNumbers', $event)"></form-input>
                  <form-input :value="user.attributes" title="Attibutes" @input="updateActiveUser('attributes', $event)"></form-input>
                </div>
              </drop-down-area>
            </div>
            <div class="card info-group">
              <drop-down-area title="Account Settings" icon="fa-cog">
                <div class="info-col">
                  <form-input :value="user.activated" title="Activated" @input="updateActiveUser('activated', $event)"></form-input>
                  <form-input :value="user.account_locked" title="Account Locked" @input="updateActiveUser('account_locked', $event)"></form-input>
                  <form-input :value="user.allow_public_key" title="Allow Public Key" @input="updateActiveUser('allow_public_key', $event)"></form-input>
                  <form-input :value="user.externally_managed" title="Externally Managed" @input="updateActiveUser('externally_managed', $event)"></form-input>
                  <form-input :value="user.sudo" title="Sudo" @input="updateActiveUser('sudo', $event)"></form-input>
                  <form-input :value="user.suspended" title="Suspended" @input="updateActiveUser('suspended', $event)"></form-input>
                </div>
              </drop-down-area>
            </div>
            <div class="card info-group">
              <drop-down-area title="Security Settings" icon="fa-shield-alt">
                <div class="info-col">
                  <form-input :value="user.password_never_expires" title="Password Never Expires" @input="updateActiveUser('password_never_expires', $event)"></form-input>
                  <form-input :value="user.password_expired" title="Password Expired" @input="updateActiveUser('password_expired', $event)"></form-input>
                  <form-input :value="user.password_expiration_date" title="Password Expiration Date" @input="updateActiveUser('password_expiration_date', $event)"></form-input>
                  <form-input :value="user.enable_user_portal_multifactor" title="Enable User Portal Multifactor" @input="updateActiveUser('enable_user_portal_multifactor', $event)"></form-input>
                  <form-input :value="user.mfa" title="MFA" @input="updateActiveUser('mfa', $event)"></form-input>
                  <form-input :value="user.passwordless_sudo" title="Passwordless Sudo" @input="updateActiveUser('passwordless_sudo', $event)"></form-input>
                  <form-input :value="user.ssh_keys" title="SSH Keys" @input="updateActiveUser('ssh_keys', $event)"></form-input>
                </div>
              </drop-down-area>
            </div>
            <div class="card info-group">
              <drop-down-area title="Advanced Settings" icon="fa-wrench">
                <div class="info-col">
                  <form-input :value="user.unix_guid" title="Unix GUID" @input="updateActiveUser('unix_guid', $event)"></form-input>
                  <form-input :value="user.unix_uid" title="Unix UID" @input="updateActiveUser('unix_uid', $event)"></form-input>
                  <form-input :value="user.samba_service_user" title="Samba Service User" @input="updateActiveUser('samba_service_user', $event)"></form-input>
                  <form-input :value="user.enable_managed_uid" title="Enable Managed UID" @input="updateActiveUser('enable_managed_uid', $event)"></form-input>
                  <form-input :value="user.totp_enabled" title="TOTP Enabled" @input="updateActiveUser('totp_enabled', $event)"></form-input>
                  <form-input :value="user.ldap_binding_user" title="LDAP Binding User" @input="updateActiveUser('ldap_binding_user', $event)"></form-input>
                </div>
              </drop-down-area>
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
  import DropDownArea from "@/components/molecules/DropDownArea.vue";
  export default{
    components: { Btn, ButtonRow, In, FormInput, DropDownArea },
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
      clickOutsideDiscardChanges(e){
        if(!document.getElementById('confirm-area') || !document.getElementById('confirm-area').contains(e.target)){
          this.discardChanges();
        }
      },
      discardChanges(){
        if(this.edited){
          this.$store.commit('confirm', {
            title: "Dicard Changes?",
            // description: "This action cannot be undone.",
            start_label: "Discard",
            start: ()=>{
              this.$store.set('users/resetEditableUser')
            },
            stop: ()=>{}
          });
        }else{
          this.$store.set('users/resetEditableUser')
        }
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
