export class NodeTemplates {

    public static RequestTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="request">
                    <span>Request</span>
                </div>
            </div>
        `;

    public static ProjectTemplate: string = 
        `
            <div id="request">
                <div class="node-drop-shadow">
                    <div class="gap flexbox-column request">
                        <span df-Name></span>
                        <input type="text" df-Host>
                        <a href="#" df-Host></a>
                    </div>
                </div>
            </div>
        `;

    public static RouteTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="filter">
                    <span>Filter</span>
                </div>
            </div>
        `;

    public static ApplicationTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="gap flexbox-column application">
                    <span df-Name></span>
                    <span df-Package></span>
                    <span df-Version></span>
                </div>
            </div>
        `;

    public static ModifierTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="modifier">
                    <span>Modifier</span>
                </div>
            </div>
        `;

    public static JoinTemplate: string = 
    
        `   
            <div class="node-drop-shadow">
                <div class="join">
                    <span>Join</span>
                </div>
            </div>
        `;

    public static SplitTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="split">
                    <span>Split</span>
                </div>
            </div>
        `;

    public static DecisionTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="decision">  
                    <span>Decision</span>
                </div>
            </div>
        `;

    public static EventTemplate: string = 
        `
            <div class="node-drop-shadow">
                <div class="event">
                    <span>Event</span>
                </div>
            </div>
        `;

    public static FacebookTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-facebook"></i> Facebook Messages</div>
            </div>
        `
    ;

    public static SlackTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>
            </div>
        `
    ;

    public static GithubTemplate: string = 
        `
            <div>
            <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>
            <div class="box">
                <p>Enter repository url</p>
            <input type="text" df-name>
            </div>
            </div>
        `
    ;

    public static TelegramTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram</div>
                <div class="box">
                    <p>Send to telegram</p>
                    <p>select channel</p>
                    <select df-channel>
                    <option value="channel_1">Channel 1</option>
                    <option value="channel_2">Channel 2</option>
                    <option value="channel_3">Channel 3</option>
                    <option value="channel_4">Channel 4</option>
                    </select>
                </div>
            </div>
        `
    ;

    public static AWSTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-aws"></i> Aws Save </div>
                <div class="box">
                    <p>Save in aws</p>
                    <input type="text" df-db-dbname placeholder="DB name"><br><br>
                    <input type="text" df-db-key placeholder="DB key">
                    <p>Output Log</p>
                </div>
            </div>
        `
    ;

    public static LogTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>
            </div>
        `
    ;

    public static GoogleTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-google-drive"></i> Google Drive save </div>
            </div>
        `
    ;

    public static EmailTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
            </div>
        `
    ;

    public static TemplateTemplate: string = 
        `
        <div>
            <div class="title-box"><i class="fas fa-code"></i> Template</div>
            <div class="box">
                Ger Vars
                <textarea df-template></textarea>
                Output template with vars
            </div>
        </div>
        `
    ;

    public static MultipleTemplate: string = 
        `
        <div>
            <div class="box">
                Multiple!
            </div>
        </div>
        `
    ;

    public static PersonalizedTemplate: string = 
        `
        <div>
            Personalized
        </div>
        `
    ;

    public static DBLClickTemplate: string = 
        `
            <div>
                <div class="title-box"><i class="fas fa-mouse"></i> Db Click</div>
                <div class="box dbclickbox" ondblclick="showPopup(event)">
                    Db Click here
                    <div class="modal" style="display:none">
                    <div class="modal-content">
                        <span class="close" onclick="closeModal(event)">&times;</span>
                        Change your variable {name} !
                        <input type="text" df-name>
                    </div>

                    </div>
                </div>
            </div>
        `
    ;
}