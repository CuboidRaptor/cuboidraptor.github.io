import subprocess
import msvcrt

powershell_script = r"""# IMPORTANT:

# You have to disable tamper protection (enable it afterwards please please please)

# ALSO ALSO:

# You shouuld still check everything in windows security anyways because why not

echo "amogus jarson script go brrrr"

echo "firewall is being lit on fire"

Set-NetFirewallProfile -Profile Domain, Public, Private -Enabled True

echo "windows defender yeets your viruses (sometimes)"

Set-MpPreference -DisableRealtimeMonitoring $false
Set-MpPreference -DisableIOAVProtection $false
New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "Real-Time Protection" -Force
New-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection" -Name "DisableBehaviorMonitoring" -Value 0 -PropertyType DWORD -Force
New-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection" -Name "DisableOnAccessProtection" -Value 0 -PropertyType DWORD -Force
New-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection" -Name "DisableScanOnRealtimeEnable" -Value 0 -PropertyType DWORD -Force
New-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiSpyware" -Value 0 -PropertyType DWORD -Force
start-service WinDefend
start-service WdNisSvc

echo "guest go bye bye"

#Remove-LocalUser -name "Guest"
"""

batch_script = """powershell "Set-ExecutionPolicy Bypass"
powershell ./mungus.ps1
powershell "Set-ExecutionPolicy Default"
"""

with open("mungus.ps1", "w") as f:
    f.write(powershell_script)

with open("batch.bat", "w") as f:
    f.write(batch_script)

subprocess.call(f"batch.bat")

print("Press any key to continue . . . ")
msvcrt.getch()
