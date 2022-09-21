import { useState, useEffect, FormEvent } from 'react';

import styles from './App.module.css';

interface Player {
  id: string | undefined;
  name: string;
  age: number | undefined;
  position: string;
  club: string;
  country: string;
}

export default function App() {
  const initialState = {
    id: undefined,
    name: '',
    age: undefined,
    position: '',
    club: '',
    country: ''
  };
  const [formData, setFormData] = useState<Player>(initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [create, setCreate] = useState(true);
  const [deleteBox, setDeleteBox] = useState({ state: false, id: '' });
  const [playersList, setPlayersList] = useState([]);

  const handleFormSubmit = async (e: FormEvent, create: boolean = true) => {
    e.preventDefault();

    if (create) await handleCreate({ ...formData, id: undefined });
    else await handleUpdate(formData);

    setFetchData(true);
    setCreate(true);
    setFormData(initialState);
    setShowForm(false);
  };

  const handleCreate = async (playerData: Player) => {
    await fetch('http://localhost:5000/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerData)
    });
  };

  useEffect(() => {
    const handleRead = async () => {
      const response = await fetch('http://localhost:5000/players', {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });
      const data = await response.json();

      setPlayersList(data.data);
      setFetchData(false);
    };

    handleRead();
  }, [fetchData]);

  const handleUpdate = async (playerData: Player) => {
    await fetch(`http://localhost:5000/players/${playerData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerData)
    });
  };

  // DELETE
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/players/${id}`, {
      method: 'DELETE'
    });

    setDeleteBox({ state: false, id: '' });
    setFetchData(true);
  };

  return (
    <div className={styles.App}>
      <div className={styles['header-container']}>
        <button className={styles['create-btn']} onClick={() => setShowForm(true)}>
          Add player
        </button>
        <input
          type="text"
          placeholder="Search for the player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      {showForm && (
        <div className={styles['form-container']}>
          <form
            className={styles['player-form']}
            onSubmit={create ? (e) => handleFormSubmit(e) : (e) => handleFormSubmit(e, false)}
          >
            <div className={styles['form-header']}>
              <h2>{create ? 'Add new' : 'Edit'} player</h2>
              <button className={styles['cancel-btn']} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
            <section className={styles['form-control']}>
              <label htmlFor="name">Player Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Enter the player name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
                required
                autoComplete="off"
              />
            </section>
            <section className={styles['form-control']}>
              <label htmlFor="age">Player Age:</label>
              <input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: Number(e.target.value) });
                }}
                min="15"
                max="40"
                required
                autoComplete="off"
              />
            </section>
            <section className={styles['form-control']}>
              <label htmlFor="name">Player Position:</label>
              <select
                id="position"
                defaultValue={formData.position}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
                required
              >
                <option value="ANY">ANY</option>
                <option value="GK">GK</option>
                <option value="CB">CB</option>
                <option value="RB">RB</option>
                <option value="LB">LB</option>
                <option value="CDM">CDM</option>
                <option value="CM">CM</option>
                <option value="RM">RM</option>
                <option value="LM">LM</option>
                <option value="CAM">CAM</option>
                <option value="RW">RW</option>
                <option value="LW">LW</option>
                <option value="ST">ST</option>
                <option value="CF">CF</option>
              </select>
            </section>
            <section className={styles['form-control']}>
              <label htmlFor="club">Player Club:</label>
              <input
                id="club"
                type="text"
                placeholder="Enter the player club"
                value={formData.club}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
                required
                autoComplete="off"
              />
            </section>
            <section className={styles['form-control']}>
              <label htmlFor="country">Player Country:</label>
              <select
                id="country"
                defaultValue={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.id]: e.target.value });
                }}
                required
              >
                <option value="ANY">Any</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">
                  Congo, The Democratic Republic of The
                </option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">
                  Heard Island and Mcdonald Islands
                </option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">
                  Korea, Democratic People's Republic of
                </option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  Lao People's Democratic Republic
                </option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">
                  Micronesia, Federated States of
                </option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">
                  Palestinian Territory, Occupied
                </option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">
                  Saint Vincent and The Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">
                  South Georgia and The South Sandwich Islands
                </option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </section>
            <button className={styles['submit-btn']}>
              {create ? 'Add new player' : 'Save changes'}
            </button>
          </form>
        </div>
      )}

      <div className={styles['list-container']}>
        <ul className={styles['players-list']}>
          <li>
            <span>NAME</span>
            <span>AGE</span>
            <span>POSITION</span>
            <span>CLUB</span>
            <span>COUNTRY</span>
          </li>
          {playersList.length > 0 ? (
            playersList
              .filter((player: Player) => {
                if (searchQuery === '') {
                  return player;
                } else if (player.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return player;
                }
              })
              .map((player: Player) => (
                <li key={player.id}>
                  <span>{player.name}</span>
                  <span>{player.age}</span>
                  <span>{player.club}</span>
                  <span>{player.country}</span>
                  <span>
                    <button
                      className={styles['edit-btn']}
                      onClick={() => {
                        setShowForm(true);
                        setCreate(false);
                        setFormData(player);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles['delete-btn']}
                      onClick={() => setDeleteBox({ state: true, id: player.id! })}
                    >
                      Remove
                    </button>
                  </span>
                </li>
              ))
          ) : (
            <p>No players registered yet</p>
          )}
        </ul>
      </div>

      {deleteBox.state && (
        <div className={styles['delete-confirm-container']}>
          <div className={styles['delete-box']}>
            <p>Are you sure you want to delete this contact?</p>
            <div className={styles['buttons-container']}>
              <button
                className={styles['confirm-delete-btn']}
                onClick={() => handleDelete(deleteBox.id)}
              >
                Yes
              </button>
              <button
                className={styles['cancel-delete-btn']}
                onClick={() => setDeleteBox({ state: false, id: '' })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
