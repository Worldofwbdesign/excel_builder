export const createHeader = ($root, state) => 
`
  <input id="headerInput" value="${state.title}" type="text" class="input" value="New Table" />
  <div class="btnsWrapp">
    <div class="button" data-button="exit">
      <i class="material-icons" data-button="exit">
        exit_to_app
      </i>
    </div>
    <div class="button" data-button="delete">
      <i class="material-icons" data-button="delete">
        delete
      </i>
    </div>
  </div>
`