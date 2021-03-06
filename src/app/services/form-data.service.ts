import { Injectable } from '@angular/core';
import { UtilService } from "./util.service";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormDataService {
    formData: any;
    formCurrentPage: any;
    openAccordionIndex;
    showSuccessMessage;

    wholeFormData = {
        "name": "HPE Call Guide",
        "metadata": "HPE call guide project",
        "data": [
            {
                "question": "Do you have a few minutes to talk about your WS implementation?",
                "stepName": "Questions",
                "pageView": "/2-few-minutes-to-talk",
                "isViewed": false,
                "isAnswered": false,
                "isRequired": true,
                "id": 0,
                "formData": [
                    {
                        "type": "radio",
                        "label": "",
                        "value": "",
                        "name": "ws-imp-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "name": "ws-imp"
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "hasFinishButton": true,
                                "hasHelpField": true,
                                "name": "ws-imp",
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "When is a good time to talk?",
                                        "value": ""
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "What WS versions are you currently running?",
                "stepName": "Questions",
                "pageView": "/3-version-of-WS",
                "isViewed": false,
                "isAnswered": false,
                "isRequired": true,
                "id": 1,
                "formData": [
                    {
                        "type": "checkbox",
                        "label": "Select all that apply:",
                        "value": "",
                        "name": "ws-version-cb",
                        "id": "",
                        "options": [
                            {
                                "label": "WS 2008",
                                "value": "WS 2008",
                                "name": "ws-version-cb",
                                "isSelected": false
                            },
                            {
                                "label": "WS 2012 R2",
                                "value": "WS 2012 R2",
                                "name": "ws-version-cb",
                                "isSelected": false
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes",

                    }
                ]
            },
            {
                "question": "What does your current WS infrastructure look like?",
                "stepName": "Questions",
                "isViewed": false,
                "pageView": "/4-what-does-infra-look-like",
                "isAnswered": false,
                "isRequired": true,
                "id": 2,
                "formData": [
                    {
                        "type": "text",
                        "label": "Number of servers:",
                        "value": "",
                        "name": "ws-infra-text",
                        "id": ""
                    },
                    {
                        "type": "text",
                        "label": "Brands / server generations:",
                        "value": "",
                        "name": "ws-infra-text",
                        "id": ""
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "helpField": false,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "Are you planning to upgrade to WS 2016 on-prem or to migrate to Azure?",
                "stepName": "Questions",
                "pageView": "/5-planning-to-upgrade-onprem-or-azure",
                "isViewed": false,
                "isAnswered": false,
                "isRequired": true,
                "id": 3,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Select one:",
                        "value": "",
                        "name": "upgrade-migrate-radio",
                        "id": "radio1",
                        "mapNeeded": true,
                        "options": [
                            {
                                "label": "Don???t know",
                                "value": "dont know",
                                "name": "upgrade-migrate-radio",
                                "mapTo": {
                                    "question": 1,
                                    "type": "checkbox",
                                    "value": {
                                        "WS 2008": 1,
                                        "WS 2012 R2": 2
                                    }
                                },
                                "uid": 1
                            },
                            {
                                "label": "Not planning to upgrade",
                                "value": "not planning to upgrade",
                                "name": "upgrade-migrate-radio",
                                "mapTo": {
                                    "question": 1,
                                    "type": "checkbox",
                                    "value": {
                                        "WS 2008": 1,
                                        "WS 2012 R2": 2
                                    }
                                },
                                "uid": 1,
                            },
                            {
                                "label": "On-prem",
                                "value": "on-prem",
                                "name": "upgrade-migrate-radio",
                                "uid": 3
                            },
                            {
                                "label": "Azure: WS 2008",
                                "value": "azure2008",
                                "name": "upgrade-migrate-radio",
                                "uid": 4
                            },
                            {
                                "label": "Azure: WS 2012 / 2016",
                                "value": "azure2012-2016",
                                "name": "upgrade-migrate-radio",
                                "uid": 5
                            },
                            {
                                "label": "Waiting for WS 2019",
                                "value": "waiting for ws2019",
                                "name": "upgrade-migrate-radio",
                                "uid": 6
                            },
                            {
                                "label": "Combination on-prem/Azure",
                                "value": "combo-on-prem-azure",
                                "name": "upgrade-migrate-radio",
                                "uid": 5
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isHelpField": true,
                        "isNotes": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ],
                "matadata": [
                    {
                        "uid": 1,
                        "heading": "Don???t know / Not planning to upgrade (from WS 2008)",
                        "data": [
                            {
                                "subHeading": "Support",
                                "content": `Are you aware that ALL types of support for WS 2008 end on 1/14/20, including extended support? Microsoft is
							offering a "security updates??? contract, but it costs 100% of
							the original license cost EVERY YEAR, for a mandatory 3
							years.`
                            },
                            {
                                "subHeading": "Security",
                                "content": `WS 2008 was built without sophisticated cyber-attacks in mind and provides little protection, leaving you vulnerable to these threats.`
                            },
                            {
                                "subHeading": "Efficiency",
                                "content": `WS 2008 was built before container
								technology. Containers support more apps on a single
								machine than VMs do, which means you reduce your
								overall server count. WS 2016 takes full advantage of this
								technology.`
                            },
                            {
                                "subHeading": "Flexibility",
                                "content": `WS 2008 is not cloud-enabled, so hybrid cloud
								isn???t an option.`
                            },
                            {
                                "subHeading": "SQL Server 2008",
                                "content": `SQL Server 2008 runs on WS 2008 and
								will reach end of life even sooner ??? on 7/19.`
                            }
                        ]
                    },
                    {
                        "uid": 2,
                        "heading": "Don???t know / Not planning to upgrade (from WS 2012)",
                        "data": [
                            {
                                "subHeading": "Support",
                                "content": `Are you aware that Mainstream Support for WS
								2012 R2 has already ended?`
                            }
                        ]
                    },
                    {
                        "uid": 4,
                        "heading": "Azure: WS 2008",
                        "data": [
                            {
                                "subHeading": "",
                                "content": `If you???re moving to Azure just to keep WS 2008, you???re just
								delaying the inevitable ??? and missing out on advanced
								security and efficiency features.`
                            },
                            {
                                "subHeading": "",
                                "content": `Application vendors may also be dropping support for 2008.`
                            },
                            {
                                "subHeading": "",
                                "content": `While there???s no charge to upload data to Azure, there IS
								an ???Egress??? charge to pull data out. It may be expensive to use it as temp storage for apps and data.`
                            },
                        ]
                    },
                    {
                        "uid": 5,
                        "heading": "Azure: WS 2012/2016",
                        "data": [
                            {
                                "subHeading": "",
                                "content": `CDW is one of Microsoft???s leading partners for Azure. We
								have experience with both Azure Public and Azure Stack
								for on-prem cloud deployments, offering exclusive Azure
								services to accelerate your deployment.`
                            }
                        ]
                    },
                    {
                        "uid": 6,
                        "heading": "Waiting for WS 2019",
                        "data": [
                            {
                                "subHeading": "",
                                "content": `You have the option now to deploy WS 2019 then
								downgrade to 2016. This option lets you to test your apps
								on WS 2016 before making the leap to 2019.`
                            }
                        ]
                    }
                ]
            },
            {
                "question": "If upgrading on-prem, when are you planning to upgrade?",
                "stepName": "Questions",
                "isViewed": false,
                "pageView": "/6-onprem-upgrade-time",
                "isAnswered": false,
                "isRequired": true,
                "id": 4,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Select one:",
                        "value": "",
                        "name": "upgrade-onprem-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Haven???t made a plan",
                                "value": "havent made plan",
                                "name": "upgrade-onprem-radio"
                            },
                            {
                                "label": "< 3 mo.",
                                "value": "less than 3 mo",
                                "name": "upgrade-onprem-radio"
                            },
                            {
                                "label": "4-6 mo.",
                                "value": "4-6 mo",
                                "name": "upgrade-onprem-radio"
                            },
                            {
                                "label": "7-12 mo.",
                                "value": "7-12 mo",
                                "name": "upgrade-onprem-radio",
                                "uid": 1
                            },
                            {
                                "label": "> 12 mo.",
                                "value": "more than 12 mo",
                                "name": "upgrade-onprem-radio",
                                "uid": 1
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isHelpField": true,
                        "isNotes": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ],
                "matadata": [
                    {
                        "heading": "No / late upgrade start date",
                        "uid": 1,
                        "data": [
                            {
                                "subHeading": "",
                                "content": `Upgrading now will ensure you avoid IT problems from
								running a system that is no longer supported.`
                            },
                            {
                                "subHeading": "",
                                "content": `Upgrading now means you can enjoy the benefits of WS
								2016 sooner rather than later.`
                            },
                            {
                                "subHeading": "",
                                "content": `Most of our customers plan to upgrade 3-6 months before
								EOS so they can validate the new environment before
								support officially ends.`
                            },

                        ]
                    },

                ]
            },
            {
                "question": "Do you have budget allocated for use in that timeframe?",
                "stepName": "Questions",
                "isViewed": false,
                "pageView": "/7-budget-allocated",
                "isAnswered": false,
                "isRequired": true,
                "id": 5,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Select one:",
                        "value": "",
                        "name": "budget-allocate-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "hasHelpField": true,
                                "name": "budget-allocate-radio",
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "Amount:",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "label": "No / not sure",
                                "value": "no",
                                "name": "budget-allocate-radio"
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "What are your infrastructure requirements going to be?",
                "stepName": "Questions",
                "isViewed": false,
                "pageView": "/8-infra-reqs",
                "isAnswered": false,
                "isRequired": true,
                "id": 6,
                "showAllAccordionOnPageload": true,
                "formData": [
                    {
                        "type": "checkbox",
                        "label": "Select all that apply and enter:",
                        "value": "",
                        "name": "infra-req-cb",
                        "id": "",
                        "isRequirements": true,
                        "disabilityCheckNeeded": true,
                        "options": [
                            {
                                "label": "Compute",
                                "value": "compute",
                                "name": "infra-req-cb",
                                "isSelected": false,
                                "uid": [1, 2],
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "Details:",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "label": "Storage",
                                "value": "storage",
                                "name": "infra-req-cb",
                                "isSelected": false,
                                "uid": [1, 2],
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "Details:",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "label": "Networking",
                                "value": "networking",
                                "name": "infra-req-cb",
                                "isSelected": false,
                                "uid": [1, 2],
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "Details:",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "label": "None",
                                "value": "none",
                                "name": "infra-req-cb",
                                "isSelected": false,
                                "isDisabled": false,
                                "disabilityCheck": {
                                    "items": [0, 1, 2, 4]
                                }
                            },
                            {
                                "label": "Already working with another hardware vendor on this",
                                "value": "already_working_vendor",
                                "name": "infra-req-cb",
                                "isSelected": false,
                                "uid": [1, 2],
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ],
                "matadata": [
                    {
                        "uid": 2,
                        "heading": "Already working with another vendor",
                        "data": [
                            {
                                "subHeading": "",
                                "content": `There are many benefits to working with HPE and CDW.
								Input from HPE and CDW can enhance your final plan. And
								the power of CDW and HPE working together may provide
								the most cost-effective proposal.`
                            },
                        ]
                    },
                    {
                        "uid": 1,
                        "heading": "All other responses",
                        "data": [
                            {
                                "subHeading": "",
                                "content": `CDW has a lot of experience helping customers modernize
								the MSFT environments. It???s important to understand the
								many options you have today, and to match your workloads
								to the right server.`
                            },
                        ]
                    }
                ]

            },
            {
                "question": "Customers have upgraded via Gen10 servers. Want to hear their feedback?",
                "stepName": "Questions",
                "isViewed": false,
                "pageView": "/9-feedback-from-gen10-customers",
                "isAnswered": false,
                "isRequired": true,
                "id": 7,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Select one:",
                        "value": "",
                        "name": "gen10-upgrade-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "name": "gen10-upgrade-radio",
                                "uid": 1
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "name": "gen10-upgrade-radio"

                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ],
                "matadata": [{
                    "heading": "Yes",
                    "uid": 1,
                    "data": [
                        {
                            "subHeading": "Security",
                            "content": `HPE Gen10 servers have built-in security
							features that reduce cybersecurity threats, including
							malware detection and firmware protection and recovery.`
                        },
                        {
                            "subHeading": "Efficiency",
                            "content": `HPE Gen10 servers provide higher
							performance, so you need fewer servers and cores. Since
							licenses and support are based on the number of cores in
							the server, more efficient servers mean both lower
							hardware costs and lower software license and support
							costs.`
                        },
                        {
                            "subHeading": "Cloud-readiness",
                            "content": `HPE Gen10 servers deliver cloud-readiness, whether public, private, or hybrid. The public
							cloud is perfect for many different apps and workloads, but
							an on-prem solution, or even a private cloud, is the best
							alternative in certain situations.`
                        }
                    ]
                },]
            },
            {
                "question": "Which of those benefits (security, efficiency, and cloud-readiness) are of particular interest to you? Can I send you some additional information?",
                "stepName": "Questions",
                "isViewed": false,
                "pageView": "/10-benefits-of-interest",
                "isAnswered": false,
                "isRequired": true,
                "id": 8,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Select one:",
                        "value": "",
                        "name": "benefits-interest-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "name": "benefits-interest-radio",
                                "hasHelpField": true,
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "Resources to be sent:",
                                        "value": ""
                                    }
                                ],
                                "uid": 1
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "name": "benefits-interest-radio"
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isHelpField": true,
                        "isNotes": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "What are the next steps? What do you need help with?",
                "stepName": "Next steps",
                "isViewed": false,
                "pageView": "/11-next-steps",
                "isAnswered": false,
                "isRequired": true,
                "id": 9,
                "formData": [
                    {
                        "type": "textArea",
                        "label": "",
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "Can I set up a meeting with one of our specialists?",
                "stepName": "Next steps",
                "isViewed": false,
                "pageView": "/12-meeting-w-specialist",
                "isAnswered": false,
                "isRequired": true,
                "id": 10,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Meeting information: ",
                        "value": "",
                        "name": "gen10-upgrade-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "name": "gen10-upgrade-radio",
                                "hasHelpField": true,
                                "helpField": [
                                    {
                                        "type": "text",
                                        "label": "Best date/time for a meeting:",
                                        "value": ""
                                    }
                                ]
                            },
                            {
                                "label": "No",
                                "uid": 1,
                                "value": "no",
                                "name": "gen10-upgrade-radio",
                                "hasHelpField": true,
                                "helpField": [
                                    // {
                                    // 	"//TODO:": "this needs to integrate",
                                    // 	"label": "Offer to send specific resources (literature, video links)",
                                    // 	"url": "www.www.com",
                                    // 	"value": ""
                                    // },
                                    {
                                        "type": "text",
                                        "label": "Resources to be sent:",
                                        "value": ""
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ],
                "matadata": [
                    {
                        "uid": 1,
                        "heading": "NO",
                        "data": [
                            {
                                "subHeading": "",
                                "content": `Offer to send specific resources:`,
                                "dontShowBullets": true
                            },
                            {
                                "subHeading": "",
                                "content": `Literature`
                            },
                            {
                                "subHeading": "",
                                "content": `Video links`
                            },
                        ]
                    }
                ]
            },
            {
                "question": "Are there other stakeholders involved in the WS migration strategy that I should contact or that should be included in the meeting?",
                "stepName": "Next steps",
                "isViewed": false,
                "pageView": "/13-other-stakeholders",
                "isAnswered": false,
                "isRequired": true,
                "id": 11,
                "formData": [
                    {
                        "type": "radio",
                        "label": "Other stakeholder(s) to be contacted: ",
                        "value": "",
                        "name": "ws-migration-strategy-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "hasHelpField": true,
                                "name": "ws-migration-strategy-radio",
                                "addDetailsData": [
                                    {
                                        "fields": [
                                            {
                                                "type": "text",
                                                "label": "Name:",
                                                "value": ""
                                            },
                                            {
                                                "type": "text",
                                                "label": "Phone:",
                                                "value": ""
                                            },
                                            {
                                                "type": "text",
                                                "label": "Email:",
                                                "value": ""
                                            },
                                            {
                                                "type": "text",
                                                "label": "Title:",
                                                "value": ""
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "name": "ws-migration-strategy-radio"
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "Confirm the next steps",
                "stepName": "Next steps",
                "isViewed": false,
                "pageView": "/14-confirm-next-steps",
                "isAnswered": false,
                "isRequired": false,
                "isConfirmStep": true,
                "id": 12,
                "formData": [
                    {
                        "//TODO:": "this needs to implement",
                        "type": "reference",
                        "label": "",
                        "value": "",
                        "name": "confirm-next-steps-list",
                        "id": "",
                        "isConfirmStep": true,
                        "options": [
                            {
                                "label": "Information to be sent: ",
                                "valueIndex": 9,
                                "value": "[captured info listed]",
                                "name": "confirm-next-steps-list"
                            },
                            {
                                "label": "Other stakeholder(s) to be contacted: ",
                                "valueIndex": 11,
                                "value": "[captured info listed]",
                                "name": "confirm-next-steps-list"
                            },
                            {
                                "label": "Meeting information: date and time, agenda topics, customer participants, and CDW participants",
                                "valueIndex": 10,
                                "value": "[captured info listed]",
                                "name": "confirm-next-steps-list"
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            },
            {
                "question": "Do you have questions or is there any additional info I can provide?",
                "stepName": "Next steps",
                "isViewed": false,
                "pageView": "/15-questions-or-more-info",
                "isAnswered": false,
                "isRequired": true,
                "id": 13,
                "formData": [
                    {
                        "type": "radio",
                        "label": "",
                        "value": "",
                        "name": "additional-info-radio",
                        "id": "radio1",
                        "options": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "name": "additional-info-radio"
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "name": "additional-info-radio"
                            }
                        ]
                    },
                    {
                        "type": "textArea",
                        "label": "Notes (optional): ",
                        "isNotes": true,
                        "isHelpField": true,
                        "value": "",
                        "name": "optional-notes"
                    }
                ]
            }
        ]
    }



    constructor(private utils: UtilService) { }

    routeChange = new Subject<boolean>();
    questionChange = new Subject<boolean>();
    questionJump = new Subject<any>();
    closeAccordionSubject = new Subject<any>();

    getROuteChangeSubject() {
        return this.routeChange;
    }

    triggerRouteChangeSubject() {
        this.routeChange.next(true);
    }

    getQuestionChangeSubject() {
        return this.questionChange;
    }

    triggerQuestionChangeSubject() {
        this.questionChange.next(true);
    }

    getQuestionJumpSubject() {
        return this.questionJump;
    }
    // previousButton() {
    //     this.conclusionPreviousButton.next(true);
    // }

    closeAccordion() {
        this.closeAccordionSubject.next(true);
    }

    // finishAccordionSubscription() {
    //     this.finishAccordionTab.next(true);
    // }

    triggerQuestionJumpSubject(questionId) {
        this.questionJump.next(questionId);
    }

    getWholeFormData() {
        return this.wholeFormData;
    }

    resetWholeFormData() {
        this.utils.clearStorage();
    }

    setInitialDataToLocalStorage() {
        this.utils.setItemInLocalStorage("currentPage", 0, false);
        this.utils.setItemInLocalStorage('submittedFormData', this.wholeFormData, true);
    }

    getFormData() {
        // console.log(document.cookie);
        let userData = this.utils.setUserCookieDataToUserFormData();
        let submittedFormData =  this.utils.getItemFromLocalStorage('submittedFormData', true);
        let stackholdersCookieData = this.utils.getCookie('stackholdersData');
        if(stackholdersCookieData) {
           stackholdersCookieData  = JSON.parse(stackholdersCookieData);
           submittedFormData.data[11].formData[0].options[0].addDetailsData = stackholdersCookieData;
        }
        
        return {
            data: submittedFormData,
            currentPage: this.utils.getItemFromLocalStorage("currentPage", false),
            userInfo: userData
        }
    }

    setFormData(formData, currentPage) {
        this.utils.setItemInLocalStorage("currentPage", currentPage, false);
        let data = this.utils.getItemFromLocalStorage("submittedFormData", true);
        data.data[currentPage] = formData;
        //storing stackholders data in the cookies
        if (currentPage == 11) {
            let stackholdersData = formData.formData[0].options[0].addDetailsData;
            document.cookie = `stackholdersData=${JSON.stringify(stackholdersData)};expires=${this.utils.getCookieExpiresTime()}`;
            data = this.utils.cloneDeep(data);

            //remvoing stackholders data from  localstorage object
            data.data[currentPage].formData[0].options[0].addDetailsData.forEach(fg => {
                fg.fields.forEach(fv => fv.value = "");
            });

        }
        this.utils.setItemInLocalStorage("submittedFormData", data, true);
    }

    moveToNextQuestion() {
        let currentPage = this.utils.getItemFromLocalStorage("currentPage", false);
        this.utils.setItemInLocalStorage("currentPage", Number(currentPage) + 1, false);
    }

    moveToPreviousQuestion() {
        let currentPage = this.utils.getItemFromLocalStorage("currentPage", false);
        if (currentPage != 0) {
            this.utils.setItemInLocalStorage("currentPage", Number(currentPage) - 1, false);
        }
    }

    moveToParticularQuestion(questionId) {
        this.utils.setItemInLocalStorage("currentPage", Number(questionId), false);
    }

    setIsAnswered(data) {
        if (data) {
            let isAnswered = data.formData.every((eachData) => {
                if (eachData.isNotes || eachData.isConfirmStep) {
                    return true;
                }
                if (eachData.type === 'text' || eachData.type === 'textArea') {
                    return eachData.value.length;
                } else if (eachData.type === 'radio') {
                    return eachData.value;
                } else if (eachData.type === 'checkbox') {
                    return (eachData.options.some((eachData) => eachData.isSelected));
                }
            });
            data.isAnswered = isAnswered;
        }
    }

    massageFormData(formData) {
        try {
            return formData.data.map(eachData => {
                let formFields = eachData;
                delete formFields.isViewed;
                delete formFields.isAnswered;
                delete formFields.isRequired;
                delete formFields.pageView;
                delete formFields.matadata;
                formFields.formData = formFields.formData.map((formField) => {
                    let formFieldData = formField;
                    delete formFieldData.isNotes;
                    delete formFieldData.isHelpField;
                    delete formFieldData.isNotes;
                    delete formFieldData.name;
                    if (formFieldData.type === 'checkbox' || formFieldData.type === 'radio') {
                        formFieldData.options = formFieldData.options.map((option) => {
                            delete option.uid;
                            delete option.name;
                            return option;
                        });
                    };
                    return formFieldData;
                });
                return formFields;
            });
        } catch (err) {
            return formData;
        }
    }

}
